import ApiService from './service';
export default class QuickAccessService extends ApiService {
    RequestCallback(data: any): Promise<{
        data: any;
        responsecode: any;
        status: any;
        message: string;
    } | {
        data: undefined;
        responsecode: any;
        status: any;
        message: any;
    }>;
    BookTestDrive(data: any): Promise<{
        data: any;
        responsecode: any;
        status: any;
        message: string;
    } | {
        data: undefined;
        responsecode: any;
        status: any;
        message: any;
    }>;
    ShowRoomVisit(data: any): Promise<{
        data: any;
        responsecode: any;
        status: any;
        message: string;
    } | {
        data: undefined;
        responsecode: any;
        status: any;
        message: any;
    }>;
    RequestQuote(data: any): Promise<{
        data: any;
        responsecode: any;
        status: any;
        message: string;
    } | {
        data: undefined;
        responsecode: any;
        status: any;
        message: any;
    }>;
    BookService(data: any): Promise<{
        data: any;
        responsecode: any;
        status: any;
        message: string;
    } | {
        data: undefined;
        responsecode: any;
        status: any;
        message: any;
    }>;
    DownloadBrochure(data: any): Promise<{
        data: any;
        responsecode: any;
        status: any;
        message: string;
    } | {
        data: undefined;
        responsecode: any;
        status: any;
        message: any;
    }>;
    NotifyMe(data: any): Promise<{
        data: any;
        responsecode: any;
        status: any;
        message: string;
    } | {
        data: undefined;
        responsecode: any;
        status: any;
        message: any;
    }>;
    SaveEnquiry(data: any): Promise<{
        data: any;
        responsecode: any;
        status: any;
        message: string;
    } | {
        data: undefined;
        responsecode: any;
        status: any;
        message: any;
    }>;
    ContactUs(data: any): Promise<{
        data: any;
        responsecode: any;
        status: any;
        message: string;
    } | {
        data: undefined;
        responsecode: any;
        status: any;
        message: any;
    }>;
    PartsEnquiry(data: any): Promise<{
        data: any;
        responsecode: any;
        status: any;
        message: string;
    } | {
        data: undefined;
        responsecode: any;
        status: any;
        message: any;
    }>;
    CampaignEnquiry(data: any): Promise<{
        data: any;
        responsecode: any;
        status: any;
        message: string;
    } | {
        data: undefined;
        responsecode: any;
        status: any;
        message: any;
    }>;
}
