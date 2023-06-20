import { NextRequest,NextResponse } from "next/server";
import { AccountsDocument,AccountDetailResponse } from '../../type/accounts'
import { Client} from "@elastic/elasticsearch";
import { Result } from "postcss";


const client = new Client({ node: 'http://34.66.66.126:9200' });
export async function POST(req:Request) {
    const {accountDetailRequest} =  await req.json();
    // console.log(JSON.stringify(accountDetailRequest))
    const {accountName,dt,recentDays} = accountDetailRequest
    const searchBody = []
    // build searchBody
    if (accountName) {
        searchBody.push({
            match:{account_name:accountName}
        })
    } 
    if (dt) {
        searchBody.push({
            match:{dt:dt}
        })
    }
    if (recentDays) {
        searchBody.push({
            match:{recent_days:recentDays}
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
        size:10
    })

    const accountDetailResponseArray:AccountDetailResponse[] = result.hits.hits.map((hit)=>{
        const accountDetailResponse:AccountDetailResponse = {
            accountName:hit._source ? hit._source.account_name : '',
            isBrand: hit._source ? hit._source.is_brand : false,
            region: hit._source ? hit._source.account_region : '',
            totalGmv: (hit._source ? parseInt(hit._source.account_video_gmv) : 0) + (hit._source ? parseInt(hit._source.account_livestream_gmv) : 0),
            totalPostedVideo: hit._source ? hit._source.account_cnt_posted_video : 0,
            totalLivestream: hit._source ? hit._source.account_cnt_livestream : 0,
            totalFollower: hit._source ? hit._source.account_cnt_follower : 0,
            totalAdsSpending: hit._source ? parseInt(hit._source.account_ads_spend) : 0,
            roas: hit._source ? parseInt(hit._source.account_return_value) / parseInt(hit._source.account_ads_spend) : 0,
            cir: hit._source ? hit._source.cir : 0,
            todayGmv:0,
            totalGPV:hit._source ? parseInt(hit._source.account_gpv) : 0,
            todayGPV:0,
            totalFollowers: hit._source ? hit._source.account_cnt_follower : 0,
            todayFollowers:0,
            totalProfile: hit._source ? hit._source.account_cnt_profile_visited : 0,
            todayProfile:0
        }
        return  accountDetailResponse;
    })

    const accountDetailResponse = accountDetailResponseArray[0]
    
    const _searchBody = []
    // build searchBody
    if (accountName) {
        _searchBody.push({
            match:{account_name:accountName}
        })
    }

    _searchBody.push({
        match:{dt:dt}
    })


    _searchBody.push({
        match:{recent_days:1}
    })


    const yesterdayResult = await client.search<AccountsDocument>({
        index: 'ads_account',
        query: {
            bool:{
            must:_searchBody
            }
        },
        from:0,
        size:10
    })

    const todayResult = yesterdayResult.hits.hits[0]._source;
    accountDetailResponse.todayGmv = (todayResult ? parseInt(todayResult.account_video_gmv) : 0) + (todayResult ? parseInt(todayResult.account_livestream_gmv) : 0),
    accountDetailResponse.todayGPV = todayResult ? parseInt(todayResult.account_gpv) : 0,
    accountDetailResponse.todayFollowers = todayResult ? todayResult.account_cnt_follower : 0,
    accountDetailResponse.todayProfile = todayResult ? todayResult.account_cnt_profile_visited : 0
    
    // console.log('accountDetailResponse:',JSON.stringify(accountDetailResponse))
    return NextResponse.json({data:accountDetailResponse});
    
}