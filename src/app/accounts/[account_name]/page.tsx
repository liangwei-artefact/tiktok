"use client";

import {CssBaseline} from "@mui/material";
import Box from '@mui/material/Box';
import AccountsDetailBreadcrumbs from '../../components/accountsDetial/AccountsDetailBreadcrumbs'
import AccountCard from "@/app/components/accountsDetial/accountCard";

export default function AccountDetialPage() {
    return (
        <>
            <CssBaseline />
            <Box sx={{ display:'flex', flexDirection:'column',width: 1}}>
                <AccountsDetailBreadcrumbs/>
                <Box sx={{ display:'flex', flexDirection:'row' }}>
                    <Box sx={{ width:300 }}> <AccountCard/></Box>
                    <Box> 我是右面卡片</Box>
                </Box>
            </Box>
        </>
        
    )
}