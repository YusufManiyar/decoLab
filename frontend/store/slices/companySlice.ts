import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Company = {
    _id: string;
    name: string;
    logo: string;
    tag: string;
}

export interface CompaniesGroup {
    group: string;
    companies: Company[];
}

interface CompaniesState {
    lists: CompaniesGroup[];
}

const initialState: CompaniesState = {
    lists: [],
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompany(state, action: PayloadAction<CompaniesGroup[]>) { 
            state.lists = action.payload;
        },
        clearCompanies(state) {
            state.lists = [];
        },
    },
});

export const { setCompany, clearCompanies } = companySlice.actions;
export default companySlice.reducer;