
// uses declarative syntax to run commands inside a container.
pipeline {
  environment {
    PROJECT = "alghanim"
    BRAND = "honda"
    APP_NAME = "cms-${BRAND}-nextjs"
    // ispg environment
    REGISTRY = "registry.cloud.ispgnet.com"
    REGISTRY_CRED = credentials('credentials-registry-ispg-cloud')
    // client environment    
    AWS_ACCESS_KEY_ID = credentials('alghanim-aws-access-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('alghanim-aws-secret-access-key')
    AWS_DEFAULT_REGION = "eu-central-1"
    CLIENT_REGISTRY_AWS = "451697948219.dkr.ecr.eu-central-1.amazonaws.com"
    // gitops config
    GITOPS_REPO = "https://bitbucket.org/ispg-projects/alghanim-gitops.git"
    GITOPS_DIR = "alg-cms-${BRAND}-nextjs"        
  }

  agent {
      kubernetes {
          yamlFile 'jenkins-agent-pod.yaml'
      }
  }

  stages {
    
    stage('Install') {
      when { anyOf { branch 'develop'; branch 'staging'; branch 'preprod'; branch 'master' } }
      steps {
        container('node') {
          sh 'npm install'
        }      
      }
    }
    
    stage('Lint') {
      when { anyOf { branch 'develop'; branch 'staging'; branch 'preprod'; branch 'master' } }
      steps {
        container('node') {
          sh 'npm run lint'
        }      
      }
    }

    stage('Build') {
      when { anyOf { branch 'develop'; branch 'staging'; branch 'preprod'; branch 'master' } }
      environment {
        GENERATE_SOURCEMAP = false
      }      
      steps {
        container('node') {
          sh "npm run build"
        } 
      }
    }

    stage('Publish') {
      when { anyOf { branch 'develop'; branch 'staging'; branch 'preprod'; branch 'master' } }
      steps {
        container('docker') {
          sh '''
            echo "logging to registry..."
            if [[ $BRANCH_NAME == "preprod" ]]; then
              aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${CLIENT_REGISTRY_AWS}  
              APP_REPO="${CLIENT_REGISTRY_AWS}/${APP_NAME}-preprod"
            elif [[ $BRANCH_NAME == "master" ]]; then
              aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${CLIENT_REGISTRY_AWS}  
              APP_REPO="${CLIENT_REGISTRY_AWS}/alg-oorjit-pr-${APP_NAME}-prod"
            else
              docker login -u ${REGISTRY_CRED_USR} -p ${REGISTRY_CRED_PSW} ${REGISTRY}
              APP_REPO="${REGISTRY}/${PROJECT}/${APP_NAME}-${BRANCH_NAME}"
            fi    
            echo "building images..."
            docker build -t ${APP_REPO}:${BUILD_NUMBER} -t ${APP_REPO}:latest .
            echo "publishing images..."
            docker push ${APP_REPO}:${BUILD_NUMBER}
            docker push ${APP_REPO}:latest 
          '''          
        }
      }
    }

    stage('GitOps') {
      when { anyOf { branch 'develop'; branch 'staging'; branch 'preprod'; branch 'master' } }
      environment {
        GIT_AUTH = credentials('bitbucket-ispgweb-devopsbot') 
      }
      steps {
        checkout([
          $class: 'GitSCM', 
          branches: [[name: 'refs/heads/master']],
          userRemoteConfigs: [[
            url: env.GITOPS_REPO,
            name: 'origin',
            refspec: '+refs/heads/master:refs/remotes/origin/master',
            credentialsId:'bitbucket-ispgweb-devopsbot', 
           ]],
        ])   
        container('yq') {   
          sh 'yq e ".image.tag = ${BUILD_NUMBER}" -i ${GITOPS_DIR}/values-${BRANCH_NAME}.yaml'       
        }
        container('git') {
          // https://support.cloudbees.com/hc/en-us/articles/360027646491-Pipeline-Equivalent-to-Git-Publisher      
          sh '''
            git config user.email 'devopsbot@ispgweb.com'
            git config user.name 'devopsbot-ispgweb'
            git commit -am "${BRANCH_NAME} ${GITOPS_DIR} image updated to ${BUILD_NUMBER}"
            git config --local credential.helper "!f() { echo username=\\$GIT_AUTH_USR; echo password=\\$GIT_AUTH_PSW; }; f"
          '''
        }
        container('git') {
          retry(10) {
            sh 'git pull --rebase --no-edit origin HEAD'
            sh 'git push origin HEAD:master'
          }
        }        
      } 
    }     

  } // end of all stages
  
  post {
    failure {
      step([$class: 'Mailer', notifyEveryUnstableBuild: true,
        recipients: emailextrecipients([
          [$class: 'DevelopersRecipientProvider'],
          [$class: 'RequesterRecipientProvider']
        ])])
    }
  }

} //  end of pipeline