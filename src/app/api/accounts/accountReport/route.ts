import { NextRequest,NextResponse } from "next/server";
import { AccountsDocument,AccountReportResponse } from '../../type/accounts'
import { Client} from "@elastic/elasticsearch";

const client = new Client({ node: 'http://34.66.66.126:9200' });
export async function POST(req:Request) {
    const {accountReportRequest} =  await req.json();
    console.log(JSON.stringify(accountReportRequest))
    const {accountName,dt,recentDays} = accountReportRequest
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

    const accountDetailResponseArray:AccountReportResponse[] = result.hits.hits.map((hit)=>{
        const _accountReportResponse:AccountReportResponse = {
            accountName:hit._source ? hit._source.account_name : '',
            brandedVideo: hit._source ? parseInt(hit._source.account_video_gmv) : 0,
            affilateVideo: 0,
            adsVideo: hit._source ? parseInt(hit._source.account_return_value) : 0,
            brandedLivestream: hit._source ? parseInt(hit._source.account_livestream_gmv) : 0,
            affilateLivestream: 0,
            brandedVideoPosted: hit._source ? hit._source.account_cnt_posted_video : 0,
            todayBrandedVideoPosted: 0,
            affilateVideoPosted: 0,
            todayAffilateVideoPosted: 0,
            campaignAds: hit._source ? parseInt(hit._source.account_ads_spend) : 0,
            todayCampaignAds: 0,
            brandLiveStreamCnt: hit._source ? hit._source.account_cnt_livestream : 0,
            brandLiveStreamDuration: hit._source ? hit._source.account_livestream_duration : 0,
            affilateLiveStreamCnt: 0
        }
        return  _accountReportResponse;
    })

    const accountReportResponse = accountDetailResponseArray[0]
    
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
        match:{recent_days:7}
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
    accountReportResponse.todayBrandedVideoPosted = todayResult ? todayResult.account_cnt_posted_video : 0;
    accountReportResponse.todayCampaignAds = todayResult ? todayResult.account_cnt_ads_count : 0;

    

    const reportResult = await client.search<AccountsDocument>({
        index: 'ads_account',
        query: {
            bool:{
                must:[
                    {
                        match:{dt:dt}
                    },
                    {
                        match:{recent_days:recentDays}
                    }
                ],
                must_not:[
                    {
                        match:{account_name:accountName}
                    },
                    {
                        term:{is_brand:true}
                    }
                ]
            }
        },
        from:0,
        size:10,
        aggs:{
            affilateVideo:{
                sum:{
                    field:'account_video_gmv'
                }
                    
            },
            affilateVideoPosted:{
                sum:{
                    field:'account_cnt_posted_video'
                }
                    
            },
            affilateLiveStreamCnt:{
                sum:{
                    field:'account_cnt_livestream'
                }
                    
            }
        }

    })

    console.log(JSON.stringify(reportResult.aggregations))
    const affilateVide:any = reportResult.aggregations?.affilateVideo
    const affilateVideoPosted:any = reportResult.aggregations?.affilateVideoPosted
    const affilateLiveStreamCnt:any = reportResult.aggregations?.affilateLiveStreamCnt
    accountReportResponse.affilateVideo = reportResult.aggregations?.affilateVideo ? affilateVide.value!: 0;
    accountReportResponse.affilateVideoPosted = reportResult.aggregations?.affilateVideoPosted ? affilateVideoPosted.value!  : 0;
    accountReportResponse.affilateLiveStreamCnt = reportResult.aggregations?.affilateLiveStreamCnt ? affilateLiveStreamCnt.value!  : 0;

    console.log('accountReportResponse:',JSON.stringify(accountReportResponse))
    return NextResponse.json({data:accountReportResponse});
    
}
