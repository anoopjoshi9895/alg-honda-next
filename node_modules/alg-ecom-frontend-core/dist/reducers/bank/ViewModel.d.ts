export interface BankListStateModel {
    financeList: BankDetailsModel[];
}
export interface BankDetailsModel {
    bankID: number;
    bankName: string;
    annualInterestRate: number;
    minimumTenure: number;
    maximumTenure: number;
    tenureIncValue: number;
    minDownPayment: number;
    maxDownPayment: number;
}
