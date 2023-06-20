
import {create} from 'zustand';
import {RowData} from './types'
import { AccountsRequest } from "../api/type/accounts";
import {getCurrentDate} from '../utils/dateUtil'

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


export default useAccountsStore;