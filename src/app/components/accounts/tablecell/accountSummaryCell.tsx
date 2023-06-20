import Box from '@mui/material/Box';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { AccountSummary }  from '../../../type/accounts-page'
import Image from 'next/image';
import AccountOfficial from '../../../icons/AccountOfficial.svg'
import DetailButton from './detailButton';
import Link from 'next/link';


export default function AccountSummaryCell(props: GridRenderCellParams<any, AccountSummary>) {
    const { value } = props;
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
                <Link href={`/accounts/${value?.account_name}`}>
                    <DetailButton />
                </Link>
            </Box>
        </Box>
    )
}