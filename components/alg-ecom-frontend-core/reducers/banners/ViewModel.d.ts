export interface BannerDataModel {
    bannerList: BannerItemModel[];
}
export interface BannerItemModel {
    bannerID: number;
    bannerTitle: string;
    bannerContent: string;
    bannerImage: string;
    bannerLink: string;
}
