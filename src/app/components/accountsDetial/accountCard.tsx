import { Box } from "@mui/material"
import Divider from '@mui/material/Divider';

export default function AccountCard() {
    return (
        <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'center', width:1 , height:600, borderBlock:'#000000', borderWidth:'2px' }}>
            <Box sx={{ height:'30%',display:'flex', flexDirection:'column' ,justifyContent:'center', alignItems:'center' }}>
                <Box>
                    account info
                </Box>
                <Box>
                    GMV info
                </Box>
                
            </Box>
            <Divider variant="middle" />
            <Box sx={{ flex: 1, display:'flex', justifyContent:'center'}}>我是中栏目</Box>
            <Divider variant="middle" />
            <Box  sx={{ height:'30%' ,display:'flex', justifyContent:'center'}}>我是下栏目</Box>
        </Box>
    )
}