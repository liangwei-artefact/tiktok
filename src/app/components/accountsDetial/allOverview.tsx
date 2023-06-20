import { Box } from "@mui/material"
import Typography from '@mui/material/Typography';
import KpiCommentIcon from '@/app/icons/KpiComment.svg'
import { AccountDetailRequest,AccountDetailResponse } from "@/app/api/type/accounts";

export default function AllOverview(props:{data:AccountDetailResponse | undefined }){


    const accountDetailResponse =  props.data

    return(
        <Box sx={{ width:'98%', height:1,paddingLeft:3, paddingRight:3,borderWidth: 1, borderRadius:'5px', borderColor:'grey', display:'flex', flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
            <Box sx={{ display:'flex', flexDirection:'column' ,alignItems:'center' }}>
                <Typography variant="h4"><b>€ {accountDetailResponse?.totalGmv}</b></Typography>
                <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-around',alignItems:'center'}}>
                    <Typography variant="h6">Total GMV</Typography>
                    &nbsp;
                    <KpiCommentIcon/>
                </Box>
                <Box sx={{ display:'flex' , flexDirection:'row'}}>
                    <Typography variant="subtitle1" color='grey'>Yesterday</Typography>
                    &nbsp;
                    <Typography variant="subtitle1" color='red'>+{accountDetailResponse?.todayGmv}</Typography>
                </Box>
            </Box>
            <Box sx={{ display:'flex', flexDirection:'column' ,alignItems:'center' }}>
                <Typography variant="h4"><b>€ {accountDetailResponse?.totalGPV}</b></Typography>
                <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-around',alignItems:'center'}}>
                    <Typography variant="h6">Total GPV</Typography>
                    &nbsp;
                    <KpiCommentIcon/>
                </Box>
                <Box sx={{ display:'flex' , flexDirection:'row'}}>
                    <Typography variant="subtitle1" color='grey'>Yesterday</Typography>
                    &nbsp;
                    <Typography variant="subtitle1" color='red'>+{accountDetailResponse?.todayGPV}</Typography>
                </Box>
            </Box>

            <Box sx={{ display:'flex', flexDirection:'column' ,alignItems:'center' }}>
                <Typography variant="h4"><b> {accountDetailResponse?.totalFollower}</b></Typography>
                <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-around',alignItems:'center'}}>
                    <Typography variant="h6">Total Followers</Typography>
                    &nbsp;
                    <KpiCommentIcon/>
                </Box>
                <Box sx={{ display:'flex' , flexDirection:'row'}}>
                    <Typography variant="subtitle1" color='grey'>Yesterday</Typography>
                    &nbsp;
                    <Typography variant="subtitle1" color='red'>+{accountDetailResponse?.todayFollowers}</Typography>
                </Box>
            </Box>

            <Box sx={{ display:'flex', flexDirection:'column' ,alignItems:'center' }}>
                <Typography variant="h4"><b> {accountDetailResponse?.totalProfile}</b></Typography>
                <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-around',alignItems:'center'}}>
                    <Typography variant="h6">Total Profile visit</Typography>
                    &nbsp;
                    <KpiCommentIcon/>
                </Box>
                <Box sx={{ display:'flex' , flexDirection:'row'}}>
                    <Typography variant="subtitle1" color='grey'>Yesterday</Typography>
                    &nbsp;
                    <Typography variant="subtitle1" color='red'>+{accountDetailResponse?.todayFollowers}</Typography>
                </Box>
            </Box>

        </Box>
    )
}