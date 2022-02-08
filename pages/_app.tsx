import App from "next/app";
import "../styles/globals.css";
import "../styles/sass/common.scss";
import "../styles/Home.scss";
import "../styles/index.scss";
import "../styles/build.scss";
import "../styles/sass/login.scss";
import "../styles/sass/account.scss";
import "../styles/trim-level.scss";

import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistor, store } from "../app/store";
import { PersistGate } from "redux-persist/integration/react";
import { api } from "alg-ecom-frontend-core";

function MyApp({ Component, pageProps }: AppProps) {
  // api.setLanguageID(1);
  // api.setWebsiteID(1);
  // api.setSubsiteID(1);



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      <Component {...pageProps} />
    </Provider>
  );
}

// MyApp.getInitialProps = async (ctx: any) => {
//   const appProps = await App.getInitialProps(ctx)
//   return {
//     ...appProps, pageProps: {
//     }
//   }
// }

export default appWithTranslation(MyApp);
