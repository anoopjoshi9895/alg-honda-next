import ApiService from './service';
import { TrackingData } from '../models/ai';
export default class AiService extends ApiService {
    sendTrackingCount(data: TrackingData): Promise<{
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
