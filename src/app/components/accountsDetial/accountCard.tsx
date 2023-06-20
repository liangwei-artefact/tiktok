import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Image from "next/image";
import AccountOfficial from "@/app/icons/AccountOfficial.svg";
import { Typography } from '@mui/material';
import { AccountDetailResponse } from '@/app/api/type/accounts';


export default function AccountCard(props:{data:AccountDetailResponse | undefined }  ) {

    const accountDetailResponse =  props.data

    return (
        <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'center', width:1 , height:700, borderBlock:'#000000', borderWidth:'2px 2px' }}>
            <Box sx={{ height:'25%', width:1,display:'flex', flexDirection:'column' ,justifyContent:'space-around', alignItems:'center' }}>
                <Box sx={{ display:'flex' ,flexDirection:'row' , justifyContent:'space-around'}}>
                    <Image
                        width={48}
                        height={48}
                        src='/AccountLogo.png'
                        alt='AccountOfficial'
                        loading="lazy"
                    />
                    <Box sx={{ display:'flex', flexDirection:'column',alignItems:"center"}}>
                        <Box sx={{ display: 'flex',flexDirection: 'row' ,justifyContent: "flex-start", alignItems:"center" }}>
                         {accountDetailResponse?.accountName} &nbsp;
                            <AccountOfficial />
                        </Box>
                        <Box sx={{ display: 'flex',flexDirection: 'row',justifyContent: "flex-start", alignItems:"center" }}>
                            @ {accountDetailResponse?.accountName + ' ' + accountDetailResponse?.region}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display:'flex', flexDirection:'column', alignItems:"center" }}>
                    <Typography component='h6'><b>Total GMV</b></Typography>
                    <Typography variant='h4'><b>€ {accountDetailResponse?.totalGmv}</b></Typography>
                </Box>
                <Box sx={{ display:'flex', flexDirection:'column', alignItems:"center" }}>
                    <Typography component='h6' color={'grey'}>Account creation: 2021/11/8</Typography>
                </Box>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ flex: 1, display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
                {
                    /**
                     * 1. 用于显示图表
                     */
                }
                <Box sx={{display: 'flex',flexDirection: 'row' ,justifyContent: "space-between", alignItems:"center"}}>
                    <Box sx={{ width:100 ,display: 'flex' , paddingLeft:2}}>
                        <Typography component='h6' >Total Video Post</Typography>
                    </Box>
                    <Box sx={{ flex:1 ,display: 'flex' ,justifyContent:'center'}}>
                        <Typography variant='h6' color={'blue'}>{accountDetailResponse?.totalPostedVideo}</Typography>
                    </Box>
                    <Box sx={{ width:100 ,display: 'flex',justifyContent:'center'}}>
                        图表
                    </Box>
                </Box>
                <Box sx={{display: 'flex',flexDirection: 'row' ,justifyContent: "space-between", alignItems:"center"}}>
                    <Box sx={{ width:100 ,display: 'flex' , paddingLeft:2}}>
                        <Typography component='h6' >Total Live Streaming</Typography>
                    </Box>
                    <Box sx={{ flex:1 ,display: 'flex' ,justifyContent:'center'}}>
                        <Typography variant='h6' color={'blue'}>{accountDetailResponse?.totalLivestream}</Typography>
                    </Box>
                    <Box sx={{ width:100 ,display: 'flex',justifyContent:'center'}}>
                        图表
                    </Box>
                </Box>
                <Box sx={{display: 'flex',flexDirection: 'row' ,justifyContent: "space-between", alignItems:"center"}}>
                    <Box sx={{ width:100 ,display: 'flex' , paddingLeft:2}}>
                        <Typography component='h6' >Total Followers</Typography>
                    </Box>
                    <Box sx={{ flex:1 ,display: 'flex' ,justifyContent:'center'}}>
                        <Typography variant='h6' color={'blue'}>{accountDetailResponse?.totalFollower}</Typography>
                    </Box>
                    <Box sx={{ width:100 ,display: 'flex',justifyContent:'center'}}>
                        图表
                    </Box>
                </Box>
            </Box>
            <Divider variant="middle" />
            <Box  sx={{ height:'40%' ,display:'flex', flexDirection:'column',  justifyContent:'space-between'}}>
                <Box sx={{ display: 'flex', flexDirection:'row', height:64 }}>
                    <Box sx={{ height:64, width:64, display:'flex',flexDirection:'row',justifyContent: "center", alignItems:"center" }}>
                        <Image
                            width={32}
                            height={32}
                            src='/ADS.png'
                            alt='ADS'
                            loading="lazy"
                        />
                    </Box>
                
                    <Box sx={{ display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
                        <Typography>Ads Spending</Typography>
                        <Typography variant='h5'><b>€ {accountDetailResponse?.totalAdsSpending}</b></Typography>
                    </Box>
                </Box>
                <Box sx={{flex:1,display:'flex',flexDirection:'column', justifyContent:'center',alignItems:"center" }}>
                    <Box sx={{ background:'#F0F0FC' ,width:'90%', height:'90%', borderRadius:'10px', display:'flex',flexDirection:'column',justifyContent:'space-around',padding:2 }}>
                        <Box>
                            <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between', }}>
                                <Typography variant='h6'>ROAS</Typography>
                                <Typography variant='h6'>€ {accountDetailResponse?.totalGmv}</Typography>
                            </Box>
                            <Box>
                                <Typography variant='subtitle2' color={'grey'}>Return on Advertising Spend for the TikTok account</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between', }}>
                                <Typography variant='h6'>GMV</Typography>
                                <Typography variant='h6'>€ {accountDetailResponse?.cir}</Typography>
                            </Box>
                            <Box>
                                <Typography variant='subtitle2' color={'grey'}>Return on Advertising Spend for the TikTok account</Typography>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Box>
    )
}