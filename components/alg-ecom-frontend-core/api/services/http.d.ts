export declare function getAuthHeader(token?: string): {
    Authorization?: undefined;
} | {
    Authorization: string;
};
export declare function getSettingHeaders(languageID?: number, websiteID?: number, subsiteID?: number, token?: string): {
    languageID?: undefined;
    websiteID?: undefined;
    subsiteID?: undefined;
    userToken?: undefined;
} | {
    languageID: number;
    websiteID: number;
    subsiteID: number;
    userToken: string | undefined;
};
export declare function get(url: string, languageID?: number, websiteID?: number, subsiteID?: number, token?: string): Promise<import("axios").AxiosResponse<any>>;
export declare function post(url: string, data: any, languageID?: number, websiteID?: number, subsiteID?: number, contentType?: string, token?: string): Promise<import("axios").AxiosResponse<any>>;
export declare function put(url: string, data: any, token?: string, languageID?: number, websiteID?: number, subsiteID?: number): Promise<import("axios").AxiosResponse<any>>;
export declare function remove(url: string, token?: string, languageID?: number, websiteID?: number, subsiteID?: number): Promise<import("axios").AxiosResponse<any>>;
export declare function upload(url: string, data: FormData, onUploadProgress: (progressEvent: any) => void, token?: string, languageID?: number, websiteID?: number, subsiteID?: number): Promise<import("axios").AxiosResponse<any>>;
export declare function download(url: string, token?: string, accept?: string, languageID?: number, websiteID?: number, subsiteID?: number): Promise<import("axios").AxiosResponse<any>>;
