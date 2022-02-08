import ApiServiceDataStore from './data';
export default class ApiService {
    store: ApiServiceDataStore;
    constructor(store: ApiServiceDataStore);
    get token(): string | undefined;
    get apiDomain(): string;
    get cmsDomain(): string | undefined;
    get languageID(): number | undefined;
    get websiteID(): number | undefined;
    get subsiteID(): number | undefined;
}
