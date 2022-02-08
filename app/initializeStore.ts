// import api from '../api';
// import unauthorizedApiResponseInterceptor from '../api/interceptor';

import {
  authActions,
  commonActions,
  api,
  UseUnauthorizedApiResponseInterceptor,
} from "alg-ecom-frontend-core";
import { RootState } from "./store";
// import Config from 'config';

const initialize = (store: any) => {
  const state: RootState = store.getState();
  UseUnauthorizedApiResponseInterceptor(() => {
    store.dispatch(authActions.logout());
    store.dispatch(commonActions.clearData());
    api.setToken(undefined);
    api.setLanguageID(undefined);
    api.setWebsiteID(undefined);
    api.setSubsiteID(undefined);
    if (window) {
      window.location.reload();
    }
  });

  if (state.authState.token) {
    api.setToken(state.authState.token);
    // store.dispatch(userActions.fetchProfile());
  }
  if (
    state.appSettingsState.data &&
    state.appSettingsState.data?.languagesList?.length > 0
  ) {
    api.setLanguageID(state.appSettingsState.data?.languagesList[0].languageID);
  }
  if (
    state.appSettingsState.data &&
    state.appSettingsState.data?.websiteList?.length > 0
  ) {
    api.setWebsiteID(
      state.appSettingsState.data?.websiteList?.find(
        (item: any) => item.websiteName === "honda"
      )?.websiteID
    );
  }
  if (
    state.appSettingsState.data &&
    state.appSettingsState.data?.subsitesList?.length > 0
  ) {
    api.setSubsiteID(
      state.appSettingsState.data?.subsitesList?.find(
        (item: any) => item.storeName === "honda"
      )?.storeID
    );
  }
};

export default initialize;
