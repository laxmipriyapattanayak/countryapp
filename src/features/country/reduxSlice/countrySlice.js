import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCountries= createAsyncThunk( "countries/fetchCountries", async () => {
    const res = await axios.get(`https://restcountries.com/v3.1/all`);
    return res.data;
});
const initialState = {
    allCountriesData: [],
    isloading: false,
    error:null,
}
export const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(fetchCountries.fulfilled,(state, action)=>{
        state.isloading = false;
        state.allCountriesData= action.payload;
        state.error=null;
    });
    builder.addCase(fetchCountries.pending,(state)=>{
        state.isloading = true;
        state.allCountriesData = [];
    });
    builder.addCase(fetchCountries.rejected,(state, action)=>{
        state.isloading = false;
        state.allCountriesData = [];
        state.error=action.error.message;
    });
    }
});

// Action creators are generated for each case reducer function


export default countrySlice.reducer


