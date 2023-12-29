import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    usersDetails: [
        { card_no: 42424242424242, cust_name: "Vishva", pin: 4545, isValid: false, availableBalance: 625.30 },
        { card_no: 62000000000047, cust_name: "Satheesh", pin: 6060, isValid: true, availableBalance: 10852.00 },
        { card_no: 36227206271667, cust_name: "Boopesh", pin: 7485, isValid: true, availableBalance: 6254.40 }
    ],
    user: '',
    result: '',
    isCardInserted:false,
}

export const slice = createSlice({
    name: 'update',
    initialState,
    reducers: { 
        setUser: (state, {payload}) => {
            state.user = payload.user
            state.isCardInserted=payload.isCardInserted
        },
        setResult: (state, action) => {
            state.result = action.payload
        },
        withdrawal: (state, {payload}) => {
            state.usersDetails[payload.index].availableBalance = state.usersDetails[payload.index].availableBalance-payload.amount
            state.user.availableBalance = state.user.availableBalance-payload.amount
        },
        deposit: (state, {payload}) => {
            state.usersDetails[payload.index].availableBalance = state.usersDetails[payload.index].availableBalance+payload.amount
            state.user.availableBalance = state.user.availableBalance+payload.amount
        }
    },
})

export const { setUser, setResult, withdrawal, deposit } = slice.actions

export default slice.reducer