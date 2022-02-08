# Install dependencies only when needed
FROM node:16.13.2-alpine
RUN apk add --no-cache \
  # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed. 
  libc6-compat \
  git

WORKDIR /app

ENV NODE_ENV production
ENV PORT 8000

# copy app package
COPY --chown=node:node package*.json ./
# install app dependencies
RUN npm ci --only=production

# copy server code
# You only need to copy next.config.js if you are NOT using the default configuration
COPY --chown=node:node next.config.js ./
COPY --chown=node:node next-i18next.config.js ./
COPY --chown=node:node public/ ./public/
COPY --chown=node:node .next/ ./.next

# which ports to publicise?
EXPOSE 8000

USER node

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

# what to run when a container boots up?
CMD ["node_modules/.bin/next", "start"]