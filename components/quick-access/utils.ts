export enum TabNames {
  EXTERIOR = 'EXTERIOR',
  INTERIOR = 'INTERIOR',
  ACCESSORIES = 'ACCESSORIES',
  INSURANCES = 'INSURANCES & SERVICES',
  TRADEIN = 'TRADE IN',
  FINANCE = 'FINANCE',
  SUMMARY = 'SUMMARY',
}
export const TabList: { key: string; value: TabNames }[] = [
  { key: 'EXTERIOR', value: TabNames.EXTERIOR },
  { key: 'INTERIOR', value: TabNames.INTERIOR },
  { key: 'ACCESSORIES', value: TabNames.ACCESSORIES },
  { key: 'INSURANCES', value: TabNames.INSURANCES },
  { key: 'TRADEIN', value: TabNames.TRADEIN },
  { key: 'FINANCE', value: TabNames.FINANCE },
  { key: 'SUMMARY', value: TabNames.SUMMARY },
];

export enum AccessTabs {
  Exterior = 'Exterior',
  Interior = 'Interior',
  Electronics = 'Electronics',
  Performance = 'Performance',
}

export enum InsServTab {
  Insurance = 'Insurance',
  Service = 'Service',
}

export enum FinanceTab {
  Cash = 'Cash',
  Payment = 'Payment',
}

export interface TradeInFormProps {
  tradeInID: number;
  brand: string;
  modelYear: number;
  modelCode: string;
  trim: string;
  mileage: number;
  agree?: boolean;
}

export const myImage =
  'https://cdn.findyourbmw.ae/public/uploads/catalog/vehicles/large/image_panorama_4S31A_2019_C1G_LCL8_180.jpeg';

export const customStyles: ReactModal.Styles = {
  content: {
    position: 'relative',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    height: '100%',
    maxWidth: '100%',
    width: '100%',
    border: '0',
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.08)',
    padding: '0',
    margin: 'auto',
  },
  overlay: {
    zIndex: 100000,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    overflow: 'auto',
  },
};

export interface QuickAccessFormProps {
  accessType: string;
  productID: string;
  modelCode: string;
  title: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  showroomID: number;
  comments: string;
  date?: string;
  time?: string;
  agree?: boolean;
}
export interface BookNowFormProps {
  firstName: string;
  lastName: string;
  gender: string;
  // modelCode: string;
  phoneNumber: string;
  email: string;
  agree?: boolean;
}

export interface BookNowOTPFormProps {
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
}

export interface SignUpFormProps {
  firstName: string;
  lastName: string;
  gender: string;
  password: string;
  phoneNumber: string;
  email: string;
  agree?: boolean;
}

export enum productTypes {
  automobiles = 'automobiles',
  powerproduct = 'powerproduct',
  motorcycle = 'motorcycle',
  marine = 'marine',
}
