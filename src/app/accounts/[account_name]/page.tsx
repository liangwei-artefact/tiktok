"use client";

import {CssBaseline} from "@mui/material";
import Box from '@mui/material/Box';
import AccountsDetailBreadcrumbs from '../../components/accountsDetial/AccountsDetailBreadcrumbs'
import AccountCard from "@/app/components/accountsDetial/accountCard";
import AllOverview from "@/app/components/accountsDetial/allOverview";
import Datefilter from "@/app/components/accountsDetial/datefilter";
import Dateperiod from "@/app/components/accounts/dateperiod";
import KpiRattingCard from "@/app/components/accountsDetial/kpiRatting";
import PostKpiCard from '@/app/components/accountsDetial/postKpiCard'
import StreamingCard from "@/app/components/accountsDetial/streamingCard";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AccountDetailRequest,AccountDetailResponse,AccountReportRequest, AccountReportResponse } from "@/app/api/type/accounts";
import { getCurrentDate } from "@/app/utils/dateUtil";
import { useAccountReportRequestStore } from "@/app/(store)/store";

export default function AccountDetialPage() {

    const [ accountDetailResponse, setAccountDetailResponse] =  useState<AccountDetailResponse>()
    const [ accountReportResponse, setAccountReportResponse] = useState<AccountReportResponse>()
    // const accountReportRequest = useAccountReportRequestStore(state => state.accountReportRequest)
    // const setAccountName = useAccountReportRequestStore(state => state.setAccountName)
    
    const pathName = usePathname();
    const accountName = pathName.slice(pathName.lastIndexOf('/') + 1);
    // setAccountName(accountName)

    const accountDetailRequest:AccountDetailRequest={
        accountName:accountName,
        dt:parseInt(getCurrentDate()),
        recentDays:-1
    }

    console.log("accountDetailRequest:",JSON.stringify(accountDetailRequest))
    
    useEffect(() => {
        fetch("/api/accounts/accountDetails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accountDetailRequest
            }),
        }).then((res) => res.json())
        .then((data) => (setAccountDetailResponse(data.data)))
        .catch((err) => console.log(err));
      }, []);

      const accountReportRequest:AccountReportRequest={
        accountName:accountName,
        dt:parseInt(getCurrentDate()),
        recentDays:-1
    }

    


    useEffect(() => {
    fetch("/api/accounts/accountReport", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            accountReportRequest
        }),
    }).then((res) => res.json())
    .then((data) => (setAccountReportResponse(data.data)))
    .catch((err) => console.log(err));
    }, []);



    return (
        <>
            <CssBaseline />
            <Box sx={{ display:'flex', flexDirection:'column',width: 1}}>
                <AccountsDetailBreadcrumbs/>
                <Box sx={{ display:'flex', flexDirection:'row' }}>
                    <Box sx={{ width:300 }}> <AccountCard data={accountDetailResponse}/></Box>
                    <Box sx={{ flex: 1, display:'flex', flexDirection:'column'}}>
                        <Box sx={{ weight:1, height:150 , display:'flex', justifyContent:'center', alignItems:'center'}}> 
                            <AllOverview data={accountDetailResponse}/>
                        </Box>
                        <Box sx={{ flex:1 , display: 'flex', flexDirection:'column',justifyContent:'space-around',alignItems:'center' }}>
                            <Box sx={{ display:'flex', flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
                                <Datefilter />
                                <Box sx={{ width: 80, paddingTop:1, display:'flex', flexDirection:'row',justifyContent:'center',alignItems:'center' }}>
                                    <Dateperiod />
                                </Box>
                            </Box>
                            <KpiRattingCard data={accountReportResponse}/>
                        </Box>
                        <Box sx={{ height:200, display: 'flex', flexDirection:'column',justifyContent:'space-between' }}>
                            <Box sx={{ display: 'flex',flexDirection:'row',justifyContent:'space-between' }}>
                                <PostKpiCard data={accountReportResponse?.brandedVideoPosted} title='Branded video posted'/>
                                <PostKpiCard data={accountReportResponse?.affilateVideoPosted} title='Affiliate video posted'/>
                                <PostKpiCard data={accountReportResponse?.campaignAds}  title='CampaignAds'/>
                            </Box>
                            <Box sx={{ display: 'flex',flexDirection:'row',justifyContent:'space-between' }}>
                                <StreamingCard title='Branded Live streaming' data={[accountReportResponse?.brandLiveStreamCnt,accountReportResponse?.brandLiveStreamDuration]}/>
                                <StreamingCard title='Affiliate Live streaming' data={[accountReportResponse?.affilateLiveStreamCnt]}/>
                            </Box>
                        </Box>
                        
                    </Box>
                </Box>
            </Box>
        </>
        
    )
}