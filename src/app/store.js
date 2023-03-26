import { configureStore } from '@reduxjs/toolkit'
import countryReducer from '../features/country/reduxSlice/countrySlice'

export const store = configureStore({
  reducer: {
    countries: countryReducer,
  },
})