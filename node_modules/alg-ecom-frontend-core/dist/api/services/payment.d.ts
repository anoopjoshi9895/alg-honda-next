import ApiService from './service';
export default class PaymentService extends ApiService {
    gerPaymentDetails(ID: string, configID: string, amount: string): Promise<any>;
    payNow(id: string, orderID: string): Promise<{
        data: any;
        responsecode: any;
        status: any;
        message: string;
    }>;
    verifyPayment(orderNo: string, refNo: string): Promise<any>;
}
