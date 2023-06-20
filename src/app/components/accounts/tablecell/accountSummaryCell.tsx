import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { AccountSummary }  from '../../../type/accounts-page'
import Image from 'next/image';
import AccountOfficial from '../../../icons/AccountOfficial.svg'
import DetailButton from './detailButton';
import Link from 'next/link';


export default function AccountSummaryCell(props: GridRenderCellParams<any, AccountSummary>) {
    const { value } = props;
    // console.log(JSON.stringify(value))
    // console.log(JSON.stringify(`${value?.img}`))
    return (
        // width 400
        <Box height={100} sx={{ display: 'flex', flexDirection: 'row',alignItems:"center" }}>
            <Box width={80}>
                <Image
                    width={64}
                    height={64}
                    src={`${value?.img}`}
                    alt={`${value?.title}`}
                    loading="lazy"
                />
            </Box>
            <Box width={190} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex',flexDirection: 'row' ,justifyContent: "flex-start", alignItems:"center" }}>
                    {value?.brand} &nbsp;
                    <AccountOfficial />
                </Box>
                <Box sx={{ display: 'flex',flexDirection: 'row',justifyContent: "flex-start", alignItems:"center" }}>
                    {value?.account_name} 
                </Box>
            </Box>
            <Box>
                <Link href='/accounts/1'>
                    <DetailButton />
                </Link>
            </Box>
        </Box>
    )
}