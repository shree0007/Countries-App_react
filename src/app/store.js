import { configureStore } from '@reduxjs/toolkit';
import countriesSlice from '../features/countries/countriesSlice.JS';

export default configureStore({
    reducer: {
        countries: countriesSlice,
    },
});
