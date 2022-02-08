export interface TrackingData {
    eventType: string;
    vehicles?: {
        model: string;
        count: number;
        configId?: string;
    }[];
    customerId?: string;
    configId?: string;
}
