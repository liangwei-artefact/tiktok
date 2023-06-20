import { NextRequest, NextResponse } from "next/server";
import { Client} from "@elastic/elasticsearch";
import { AccountsRequest,AccountsResponse,AccountInfo,AccountsRow,AccountsDocument } from "../type/accounts";


const client = new Client({ node: 'http://34.66.66.126:9200' });



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
  // console.log(JSON.stringify(accountsRequest))
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

  // console.log(JSON.stringify(searchBody))
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