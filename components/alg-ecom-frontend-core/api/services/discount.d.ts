import ApiService from "./service";
export default class DiscountService extends ApiService {
    discountApproval(token: string): Promise<any>;
    discountAccept(token: string, status: string, comments: string): Promise<any>;
}
