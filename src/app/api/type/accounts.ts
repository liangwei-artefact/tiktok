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