import { Box,Typography } from "@mui/material"
import PostKpiCardIcon from '@/app/icons/PostKpiCardDetail.svg'


export default function PostKpiCard(props:{data:number|undefined, title:string }) {
    const { data, title } = props

    return (
        <Box sx={{ width:420,height:80, display:'flex',flexDirection:'row', justifyContent:'space-between', alignItems:'center' ,borderWidth: '1px', paddingRight:2}}>
            <Box sx={{ width:100,display:'flex',justifyContent:'center' ,alignItems:'center'}}>
                图片
            </Box>
            <Box sx={{flex:1, display:'flex' , flexDirection:'column'}}>
                <Typography variant='h6'>{title}</Typography>
                <Box sx={{ display:'flex', flexDirection:'row'}}>
                    <Typography variant="subtitle1">Vs last days</Typography>
                    <Typography variant="subtitle1" color={'red'}>+ 4</Typography>
                </Box>
            </Box>
            <Box sx={{width:100, display:'flex' , flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                <Typography variant="h4">{data}</Typography>
                <PostKpiCardIcon />
            </Box>
        </Box>
    )
}