import { CrudService, UserService, QuickAccessService, PaymentService, AiService, DiscountService } from './services';
import { AppSettingsService } from './services/app-settings';
import BuildService from './services/build';
export default class AlghanimApiClient {
    crud: CrudService;
    user: UserService;
    build: BuildService;
    appSettings: AppSettingsService;
    quickAccess: QuickAccessService;
    payment: PaymentService;
    discount: DiscountService;
    ai: AiService;
    private store;
    constructor(apiDomain: string, cmsDomain?: string);
    setToken(token?: string): void;
    setCmsDomain(token?: string): void;
    setLanguageID(id?: number): void;
    setWebsiteID(id?: number): void;
    setSubsiteID(id?: number): void;
    setCurrencyID(id?: number): void;
}
