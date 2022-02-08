import {
  appSettingsErrorAction,
  appSettingsLoadedAction,
  requestAppSettingsAction,
  AppSettingsService,
  AppSettingsLanguageAction,
  AppSettingsWebsiteAction,
  AppSettingsSubsiteAction,
  AppSettingsHtmlDirectionAction,
  AppSettingsLanguageModel,
  api,
} from "alg-ecom-frontend-core";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";

export const useMasterData = (
  appSettingsService: AppSettingsService,
  franchise: string
) => {
  const appSettings = useSelector((state: RootState) => state.appSettingsState);
  const dispatch = useDispatch();
  const loadAppSettings = useCallback(async () => {
    dispatch(requestAppSettingsAction());
    try {
      const response: any = await appSettingsService.getAppSettings();
      const data = response?.data?.data;
      const languge: AppSettingsLanguageModel = data?.languagesList?.find(
        (item: AppSettingsLanguageModel) => item.languageLcidstring === "en"
      );
      data.subsitesList = response?.data?.data?.subsitesList?.filter(
        (item: any) => item.storeName === franchise
      );
      data.websiteList = response?.data?.data?.websiteList?.filter(
        (item: any) => item.websiteName === franchise
      );
      dispatch(appSettingsLoadedAction(data));
      if (languge) {
        dispatch(AppSettingsLanguageAction(languge?.languageID));
        api.setLanguageID(languge?.languageID);
        dispatch(
          AppSettingsHtmlDirectionAction(
            languge.languageLcidstring === "en" ? "ltr" : "rtl"
          )
        );
      }

      dispatch(AppSettingsWebsiteAction(data.websiteList[0]?.websiteID));
      dispatch(AppSettingsSubsiteAction(data.subsitesList[0]?.storeID));

      api.setWebsiteID(data.websiteList[0]?.websiteID);
      api.setSubsiteID(data.subsitesList[0]?.storeID);
    } catch (e) {
      dispatch(appSettingsErrorAction(e));
    }
  }, [dispatch, appSettingsService]);
  useEffect(() => {
    if (!appSettings.loaded && !appSettings.loading) {
      loadAppSettings();
    }
  }, [appSettings, loadAppSettings]);

  return {
    ...appSettings,
  };
};
