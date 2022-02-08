import ApiService from './service';
export default class UserService extends ApiService {
    login(credentials: {
        userLogin: string;
        password: string;
    }): Promise<{
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
    signUp(data: any): Promise<{
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
    guestSignUp(data: any): Promise<{
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
    changeUserPhone(data: any, userToken?: string): Promise<{
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
    verifyOtp(data: any): Promise<{
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
    resendOtp(data: any): Promise<{
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
    fbUserSignup(data: any): Promise<{
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
    googleUserSignup(data: any): Promise<{
        data: any;
        responsecode: any;
        status: any;
        message: any;
    }>;
    gerConfigurations(): Promise<any>;
    gerOrders(): Promise<any>;
    gerBookings(): Promise<any>;
    gerOrderDetails(orderID?: number): Promise<any>;
    getBookingDetails(bookingID?: number): Promise<any>;
    getConfigurationDetails(configID?: number): Promise<any>;
    forgotPassword(data: any): Promise<{
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
    resetPassword(data: any): Promise<{
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
