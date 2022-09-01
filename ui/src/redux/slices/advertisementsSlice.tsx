import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { RootState } from "..";
import api from "../../api";
import { Advertisement } from "../../types";
import { daToDate } from "../../util";

interface AdvertisementState {
    advertisements: {
        ads: Advertisement[] | null,
        myads: Advertisement[] | null,
    }
};

const initialState: AdvertisementState = {
    advertisements: {
        ads: null,
        myads: null,
    }
};

export const loadAds = createAsyncThunk('loadAds', async (data, thunkAPI) => {
    const res = await api.scry({
        app: 'classifieds',
        path: '/state/'
    });

    console.log(res);

    const newads = {
        ads: [...res.ads!.sort((a, b) => daToDate(b.date!).diff(daToDate(a.date!)))]
        , myads: [...res.myads!.sort((a, b) => daToDate(b.date!).diff(daToDate(a.date!)))]
    }

    thunkAPI.dispatch(setAdvertisements(newads));
})

const advertisementsSlice = createSlice({
    name: "advertisements",
    initialState,
    reducers: {
        setAdvertisements: (state, action) => {
            state.advertisements = action.payload;
        },
    },
});

export const { setAdvertisements } = advertisementsSlice.actions;
export default advertisementsSlice.reducer;