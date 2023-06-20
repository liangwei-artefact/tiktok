import { NextRequest, NextResponse } from "next/server";
import { Client} from "@elastic/elasticsearch";
import { AccountsRequest,AccountsResponse,AccountInfo,AccountsRow } from "../type/accounts";


const client = new Client({ node: 'http://34.66.66.126:9200' });

interface AccountsDocument {
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
    account_gpv: number;
    account_id: string;
    account_livestream_gmv: string;
    account_name: string;
    account_region: string;
    account_return_value: number;
    account_video_gmv: string;
    brand_name: string;
    cir: number;
    dt: number;
    is_brand: boolean;
    recent_days: number;
}

export async function GET() {
    const result:any = await client.search<AccountsDocument>({
        index: 'ads_account',
        query: {
          bool:{
            must:[
              {
                match_all:{
                }
              }
            ]
          }
        },
        from:0,
        size:1
      })
    return NextResponse.json({result});
    
}

export async function POST(req: Request) {
  const {accountsRequest} =  await req.json();
  console.log(JSON.stringify(accountsRequest))
  const searchBody = []
  // build searchBody
  if ('brand' in accountsRequest && accountsRequest.brand != 'ALL Brands') {
    searchBody.push({
      match:{brand_name:accountsRequest.brand}
    })
  } 
  if ('region' in accountsRequest && accountsRequest.region.trim() != '🌏 All') {
      searchBody.push({
        match:{account_region:accountsRequest.region.split(' ')[1]}
      })
  }
  if ('dateRange' in accountsRequest) {
      searchBody.push({
        match:{recent_days:parseInt(accountsRequest.dateRange)}
      })
  }

  if ('dt' in accountsRequest) {
    searchBody.push({
      match:{dt:accountsRequest.dt}
    })
}

  console.log(JSON.stringify(searchBody))
  const result = await client.search<AccountsDocument>({
      index: 'ads_account',
      query: {
        bool:{
          must:searchBody
        }
      },
      from:0,
      size:100
  })

  
  // handler result
  const accountsRowArray:AccountsRow[] = result.hits.hits.map((hit) => {
    const accountInfo:AccountInfo = {
      account_name: hit._source?.account_name,
      account_avatar_image: '/AccountLogo.png',
      account_region: hit._source?.account_region,
      account_id: hit._source?.account_id,
      is_brand: hit._source?.is_brand,
      brand_name: hit._source?.brand_name
    }

    const accountsRow:AccountsRow = {
      accountInfo: accountInfo,
      accountCntGmv: (hit._source ? parseFloat(hit._source.account_livestream_gmv) : 0) + (hit._source ? parseFloat(hit._source.account_video_gmv) : 0),
      accountCntFollower: hit._source?.account_cnt_follower,
      accountCntPostedVideo: hit._source?.account_cnt_posted_video,
      accountCntLivestream: hit._source?.account_cnt_livestream,
      accountAdsSpend: hit._source ? parseFloat(hit._source?.account_ads_spend) : 0
    }
    return accountsRow;
  })

  const accountsResponse:AccountsResponse = {
    accounts: accountsRowArray
  }

  return NextResponse.json({data:accountsResponse});
}