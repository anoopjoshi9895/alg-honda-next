import { useEffect } from "react";
import Header from "./header";
import Footer from "../components/footer";
import { useMasterData } from "../app/useMasterData";
import { api } from "alg-ecom-frontend-core";
import { useState } from "react";
import { FullPageLoader } from "./loader";
import { useRouter } from "next/router";
import { useAuth } from "../utils/useAuth";
const Layout = (props: {
  children: any;
  footerData: any;
  avoidHeader?: boolean;
  avoidFooter?: boolean;
  isAuthenticatedRoute?: boolean;
}) => {
  const connectWithUs = props?.footerData?.connectWithUs;
  const extraLinks = props?.footerData?.extraLinks;
  const menuItems = props?.footerData?.menuItems;
  const serviceLinks = props?.footerData?.serviceLinks;
  const socialMedia = props?.footerData?.socialMedia;
  const copyRight = props?.footerData?.copyRight;
  const title = props?.footerData?.title;

  const masterData = useMasterData(api.appSettings, "honda");
  const [routeChangeOccuring, setRouteChangeOccuring] = useState(false);

  let router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => setRouteChangeOccuring(true));
    router.events.on("routeChangeComplete", () =>
      setRouteChangeOccuring(false)
    );
    router.events.on("routeChangeError", () => setRouteChangeOccuring(false));
  }, []);

  const { authChecking, authChecked } = useAuth(props?.isAuthenticatedRoute);

  return (
    <div className="layout">
      {routeChangeOccuring && <FullPageLoader />}
      {!routeChangeOccuring && (
        <>
          {!props?.avoidHeader && <Header />}
          {props.children}
          {!props?.avoidFooter && (
            <Footer
              connectWithUs={connectWithUs}
              extraLinks={extraLinks}
              menuItems={menuItems}
              serviceLinks={serviceLinks}
              socialMedia={socialMedia}
              copyRight={copyRight}
              title={title}
            />
          )}
        </>
      )}
    </div>
  );
};
export default Layout;
