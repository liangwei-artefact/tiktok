import { Box,Typography } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import Divider from '@mui/material/Divider';
import { AccountReportResponse } from "@/app/api/type/accounts";

export default function KpiRattingCard(props:{data:AccountReportResponse | undefined }) {
    const accountReportResponse =  props.data

    const total = (accountReportResponse?.brandedVideo ? accountReportResponse?.brandedVideo : 0 )
                + (accountReportResponse?.affilateVideo ? accountReportResponse?.affilateVideo : 0)
                + (accountReportResponse?.adsVideo ? accountReportResponse?.adsVideo :0)
                + (accountReportResponse?.brandedLivestream ? accountReportResponse?.brandedLivestream : 0)
                + (accountReportResponse?.affilateLivestream ?  accountReportResponse?.affilateLivestream : 0)

    const brandedVideoRate = (accountReportResponse?.brandedVideo ? accountReportResponse?.brandedVideo : 0 ) / total * 100
    const affilateVideoRate = (accountReportResponse?.affilateVideo ? accountReportResponse?.affilateVideo : 0) / total * 100
    const adsVideoRate = (accountReportResponse?.adsVideo ? accountReportResponse?.adsVideo :0) / total * 100
    const brandedLivestreamRate = (accountReportResponse?.brandedLivestream ? accountReportResponse?.brandedLivestream : 0) / total * 100
    const affilateLivestreamRate = (accountReportResponse?.affilateLivestream ?  accountReportResponse?.affilateLivestream : 0) / total * 100


    return(
        <Box sx={{ width:1, display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'stretch'}}>
        <Box sx={{ borderWidth: 1, borderRadius:'5px', borderColor:'grey', width:1,height:150, display:'flex',flexDirection:'row',alignItems:'center' }}>
            {/* 最左边的图标 + 指标 */}
            <Box sx={{ display:'flex',flexDirection:'row' }}>
                <Box sx={{ width:150, display:'flex', justifyContent:'center', alignItems:'center' }}>
                    图表
                </Box>
                <Box sx={{ display:'flex', flexDirection:'column',width:100 }}> 
                    <Typography component='h1'>GMV Contribution Source</Typography>
                    <Typography variant='h5' color={'blue'}><b>€ {total}</b></Typography>
                </Box>
            </Box>
            {/* kpi 指标 */}
            <Box sx={{ paddingLeft:2, flex:1, display:'flex', flexDirection:'row',justifyContent:'space-around'}}>
                <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'start'  }}>
                    <Box sx={{paddingTop:0.75, display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                        <CircleIcon sx={{ width:'10px', height:'10px' }}/> &nbsp; 
                    </Box>
                    <Box sx={{ display:'flex', flexDirection:'column',justifyContent:'start'}}>
                        <Typography component='h6'>Branded Video</Typography>
                        <Typography variant='h5'>{brandedVideoRate.toPrecision(2)}%</Typography>
                        <Typography variant='subtitle1' color='grey'>{accountReportResponse?.brandedVideo}</Typography>
                    </Box>
                    {/* <Box sx={{ paddingLeft:1,paddingRight:1}}>
                        <Divider orientation="vertical"/>
                    </Box> */}
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'start'  }}>
                    <Box sx={{paddingTop:0.75, display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                        <CircleIcon sx={{ width:'10px', height:'10px' }}/> &nbsp; 
                    </Box>
                    <Box sx={{ display:'flex', flexDirection:'column',justifyContent:'start'}}>
                        <Typography component='h6'>Affilate Video</Typography>
                        <Typography variant='h5'>{affilateVideoRate.toPrecision(2)}%</Typography>
                        <Typography variant='subtitle1' color='grey'>{accountReportResponse?.affilateVideo}</Typography>
                    </Box>
                    {/* <Box sx={{ paddingLeft:1,paddingRight:1}}>
                        <Divider orientation="vertical"/>
                    </Box> */}
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'start'  }}>
                    <Box sx={{paddingTop:0.75, display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                        <CircleIcon sx={{ width:'10px', height:'10px' }}/> &nbsp; 
                    </Box>
                    <Box sx={{ display:'flex', flexDirection:'column',justifyContent:'start'}}>
                        <Typography component='h6'>Ads Video</Typography>
                        <Typography variant='h5'>{adsVideoRate.toPrecision(2)}%</Typography>
                        <Typography variant='subtitle1' color='grey'>{accountReportResponse?.adsVideo}</Typography>
                    </Box>
                    {/* <Box sx={{ paddingLeft:1,paddingRight:1}}>
                        <Divider orientation="vertical"/>
                    </Box> */}
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'start'  }}>
                    <Box sx={{paddingTop:0.75, display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                        <CircleIcon sx={{ width:'10px', height:'10px' }}/> &nbsp; 
                    </Box>
                    <Box sx={{ display:'flex', flexDirection:'column',justifyContent:'start'}}>
                        <Typography component='h6'>Branded Live Streaming</Typography>
                        <Typography variant='h5'>{brandedLivestreamRate.toPrecision(2)}%</Typography>
                        <Typography variant='subtitle1' color='grey'>{accountReportResponse?.brandedLivestream}</Typography>
                    </Box>
                    {/* <Box sx={{ paddingLeft:1,paddingRight:1}}>
                        <Divider orientation="vertical"/>
                    </Box> */}
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'start'  }}>
                    <Box sx={{paddingTop:0.75, display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                        <CircleIcon sx={{ width:'10px', height:'10px' }}/> &nbsp; 
                    </Box>
                    <Box sx={{ display:'flex', flexDirection:'column',justifyContent:'start'}}>
                        <Typography component='h6'>Affiliate Live Streaming</Typography>
                        <Typography variant='h5'>{affilateLivestreamRate.toPrecision(2)}%</Typography>
                        <Typography variant='subtitle1' color='grey'>{accountReportResponse?.affilateLivestream}</Typography>
                    </Box>
                    {/* <Box sx={{ paddingLeft:1,paddingRight:1}}>
                        <Divider orientation="vertical"/>
                    </Box> */}
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'start'  }}>
                    <Box sx={{paddingTop:0.75, display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                        <CircleIcon sx={{ width:'10px', height:'10px' }}/> &nbsp; 
                    </Box>
                    <Box sx={{ display:'flex', flexDirection:'column',justifyContent:'start'}}>
                        <Typography component='h6'>Orther</Typography>
                        <Typography variant='h5'>0%</Typography>
                        <Typography variant='subtitle1' color='grey'>0%</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
    )
}