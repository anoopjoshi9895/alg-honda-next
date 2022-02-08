import 'moment-timezone';
export declare const formatDate: (date: string | Date, dateFormat: string) => string;
export declare const formatUTCDate: (date: string | Date, dateFormat: string) => string;
export declare const convertToTimezone: (date: Date, timezone?: string) => Date;
export declare const formatDateWithTimeZone: (date: string | Date, timezone?: string, dateFormat?: string) => string;
export declare const tryFormatDate: (date: string | Date, dateFormat?: string) => string | Date;
export declare const tryFormatDateWithTimezone: (date: string | Date, timezone?: string, dateFormat?: string) => string | Date;
export declare class DateFormats {
    static NormalFromat: string;
    static MonthNameFormat: string;
    static MonthNameOnly: string;
    static TimeOnlyFormat: string;
}
export declare const addDays: (date: Date, days: number) => Date;
export declare const getUTCStartOfDate: (date: Date) => Date;
