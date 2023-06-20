"use client";

import {CssBaseline} from "@mui/material";
import Box from '@mui/material/Box';
import BrandFilter from '../components/accounts/brandfilter';
import RegionFilter from '../components/accounts/regionfilter'
import Datefilter from '../components/accounts/datefilter'
import ExportButton from '../components/accounts/ExportButton'
import Chip from '@mui/material/Chip';
import CalendarTodayIcon from '../icons/calendar_today.svg'
import AccountsDataTable from '../components/accounts/accountsDataTable'
import AccountsTotalTable from '../components/accounts/accountsTotalTable'
import { useEffect,useState } from "react";
import { AccountsRequest,AccountsResponse } from "../api/type/accounts";
import {getCurrentDate} from '../utils/dateUtil'
import {useAccountsRequestStore} from '@/app/(store)/store'



export default function AccountPage() {

    const accountsRequest = useAccountsRequestStore(state => state.accountsRequest)
    
    const [ accountsResponse,setAccountsResponse ] = useState<AccountsResponse>({
        accounts: [],
    })

    useEffect(() => {
        fetch("/api/accounts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accountsRequest
            }),
        }).then((res) => res.json())
        .then((data) => setAccountsResponse(data.data))
        .catch((err) => console.log(err));
      }, [accountsRequest]);
    
    

    return (
        <> 
            <CssBaseline />
            <Box height="95vh" sx={{ display: 'flex', flexDirection: 'column'}}>
                <Box sx={{ height: 100 , display: 'flex' ,flexDirection: 'column' }}>
                    <Box sx={{ height: 60, display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent: 'space-between'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', width: 400}}>
                            <BrandFilter />
                            <RegionFilter />
                        </Box>
                        <Datefilter />
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:'flex-end', width: 400}}>
                            <ExportButton />
                        </Box>
                    </Box>
                    <Box sx={{ height: 40 , display: 'flex', flexDirection: 'row', justifyContent: 'center',alignItems:'center'}}>
                        <Chip icon={<CalendarTodayIcon />} label="date" />
                    </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' , paddingTop: 2}}>
                    {/* {JSON.stringify(accountsResponse)} */}
                    <AccountsDataTable data={accountsResponse}/>
                </Box>
                <Box sx={{ height: 80,display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                    <AccountsTotalTable />
                </Box>
            </Box>
        </>
        
    )
}