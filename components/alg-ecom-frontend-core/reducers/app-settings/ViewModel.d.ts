export interface AppSettingsStateViewModel {
    data?: AppSettingsDataViewModel;
    languageID?: number;
    websiteID?: number;
    subsiteID?: number;
    htmlDirection: string;
    loaded?: boolean;
    loading?: boolean;
    error?: any;
}
export interface AppSettingsDataViewModel {
    languagesList: AppSettingsLanguageModel[];
    currencyList: AppSettingsCurrencyModel[];
    websiteList: AppSettingsWebsiteModel[];
    subsitesList: AppSettingsSubsiteModel[];
}
export interface AppSettingsLanguageModel {
    languageID: number;
    languageName: string;
    languageLcidstring: string;
    languageImage: string;
    languageDirection: string;
}
export interface AppSettingsCurrencyModel {
    currencyID: number;
    currencyName: string;
    currencyCode: string;
    currencyDecimalPlaces: number;
    currencyValue: number;
    currencyDefault: string;
}
export interface AppSettingsWebsiteModel {
    websiteID: number;
    websiteName: string;
    websiteCode: string;
    websiteLogo: string;
    websiteMobileLogo: string;
}
export interface AppSettingsSubsiteModel {
    storeID: number;
    storeName: string;
    storeCode: string;
    subsiteTaxType: string;
    websiteName: string;
    websiteCode: string;
    defaultStore: string;
    countryName: null;
    storeCurrency: string;
    storeLangIDs: string;
}
export declare const initialAppSettingsStateViewModel: AppSettingsStateViewModel;
