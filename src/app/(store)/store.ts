
import {create} from 'zustand';
import {RowData} from './types'
import { AccountsRequest } from "../api/type/accounts";
import {getCurrentDate} from '../utils/dateUtil'
import { AccountReportRequest } from '../api/type/accounts';

interface AccountsState {
    rowData: RowData[]
    setRowData: (rowData: RowData[]) => void
  }

const useAccountsStore = create<AccountsState>(
    (set) => ({
        rowData: [],
        setRowData: (newRowData) => {
            set((state) => {
                return {
                    rowData: newRowData
                }
            })
        }
    })
)


interface AccountSelectedStoreState {
    selectArray: number[]
    setSelectArray: (selectArray: number[]) => void
  }


export const useAccountSelectedStore = create<AccountSelectedStoreState>(
    (set) => ({
        selectArray: [],
        setSelectArray: (selectArray) => {
            set((state) => {
                return {
                    selectArray : selectArray 
                }
            })
        }
    })
)


interface AccountsRequestState {
    accountsRequest: AccountsRequest
    setBrand: (brand: string) => void
    setRegion: (region: string) => void
    setDateRange: (dateRange: string) => void
}

export const useAccountsRequestStore = create<AccountsRequestState>(
    (set) => ({
        accountsRequest: { brand:'ALL Brands',region:'🌏 All ', dateRange: "1",dt: parseInt(getCurrentDate()) },
        setBrand: (brand) => {
            set((state) => {
                return {
                    accountsRequest: {...state.accountsRequest, brand: brand}
                }
            })
        },
        setRegion: (region) => {
            set((state) => {
                return {
                    accountsRequest: {...state.accountsRequest, region: region}
                }
            })
        },
        setDateRange: (dateRange) => {
            set((state) => {
                return {
                    accountsRequest: {...state.accountsRequest, dateRange: dateRange}
                }
            })
        }
    })
)



interface AccountReportRequestState {
    accountReportRequest: AccountReportRequest
    setDateRange: (dateRange: string) => void
    setAccountName: (accountName: string) => void
}


export const useAccountReportRequestStore = create<AccountReportRequestState>(
    (set) => ({
        accountReportRequest: { accountName: '', dt: parseInt(getCurrentDate()), recentDays: 1 },
        setDateRange: (dateRange) => {
            set((state) => {
                return {
                    accountReportRequest: {...state.accountReportRequest, recentDays: parseInt(dateRange)}
                }
            })
        },
        setAccountName: (accountName) => {
            set((state) => {
                return {
                    accountReportRequest: {...state.accountReportRequest, accountName: accountName}
                }
            })
        }
    })
)





export default useAccountsStore;