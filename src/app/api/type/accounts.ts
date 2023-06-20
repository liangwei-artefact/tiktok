export interface AccountsRequest { 
    brand?: string;
    region?: string;
    dateRange: string;
    dt?: number;
}

export interface AccountInfo {
    account_name: string | undefined;
    account_avatar_image: string | undefined;
    account_region: string | undefined;
    account_id: string | undefined;
    is_brand: boolean | undefined;
    brand_name: string | undefined;
}

export interface AccountsRow {
    accountInfo: AccountInfo;
    accountCntGmv: number | undefined;
    accountCntFollower: number | undefined;
    accountCntPostedVideo: number | undefined;
    accountCntLivestream: number | undefined;
    accountAdsSpend: number | undefined ;
}

export interface AccountsResponse {
    accounts: AccountsRow[];
    total?: number;
    size?: number;
    page?: number;
}


export interface AccountsDocument {
    account_ads_spend: string;
    account_avatar_image: string;
    account_cnt_ads_click: number;
    account_cnt_ads_count: number;
    account_cnt_ads_gmv: number;
    account_cnt_follower: number;
    account_cnt_livestream: number;
    account_cnt_posted_video: number;
    account_cnt_profile_visited: number;
    account_cnt_sales_orders: number;
    account_cnt_video_views: number;
    account_duration_livestream: number;
    account_gpv: string;
    account_id: string;
    account_livestream_gmv: string;
    account_name: string;
    account_region: string;
    account_return_value: string;
    account_video_gmv: string;
    brand_name: string;
    cir: number;
    dt: number;
    is_brand: boolean;
    recent_days: number;
    account_livestream_duration: number;
}

export interface AccountDetailRequest {
    accountName: string;
    dt: number;
    recentDays: number;
}

export interface AccountDetailResponse {
    accountName: string;
    isBrand: boolean;
    region: string;
    totalGmv: number;
    todayGmv: number;
    totalPostedVideo: number;
    totalLivestream: number;
    totalFollower: number;
    totalAdsSpending: number;
    roas: number;
    cir: number;
    totalGPV: number;
    todayGPV: number;
    totalFollowers: number;
    todayFollowers: number;
    totalProfile: number;
    todayProfile: number;
}


export interface AccountReportRequest {
    accountName: string;
    dt: number;
    recentDays: number;
}

export interface AccountReportResponse {
    accountName: string;
    brandedVideo: number;
    affilateVideo: number;
    adsVideo: number;
    brandedLivestream: number;
    affilateLivestream: number;
    brandedVideoPosted: number;
    todayBrandedVideoPosted: number;
    affilateVideoPosted: number;
    todayAffilateVideoPosted: number;
    campaignAds: number;
    todayCampaignAds: number;
    brandLiveStreamCnt: number;
    brandLiveStreamDuration: number;
    affilateLiveStreamCnt: number;
}