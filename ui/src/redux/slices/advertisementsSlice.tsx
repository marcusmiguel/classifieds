import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { RootState } from "..";
import api from "../../api";
import { Advertisement, Favorite } from "../../types";
import { daToDate } from "../../util";

interface AdvertisementState {
    advertisements: {
        ads: Advertisement[] | null,
        myads: Advertisement[] | null,
        favorites: Favorite[] | null
    }
};

const initialState: AdvertisementState = {
    advertisements: {
        ads: null,
        myads: null,
        favorites: null
    }
};

interface toggleFavoriteData {
    id: string,
}

export const loadAds = createAsyncThunk('loadAds', async (data, thunkAPI) => {
    const res = await api.scry({
        app: 'classifieds',
        path: '/state/'
    });

    console.log(res);

    let newads = res.ads.map(ad => {
        ad.isFavorited = false;
        return ad;
    });

    res.favorites.forEach(fav => {
        let index = newads.findIndex(obj => obj.id == fav);
        if (index != undefined) {
            newads[index].isFavorited = true;
        }
    }
    )

    const sortedData = {
        ads: [...newads.reverse()],
        myads: [...res.myads.reverse()],
        favorites: res.favorites,
    };

    thunkAPI.dispatch(setAdvertisements(sortedData));
});

export const toggleFavorite = createAsyncThunk('toggleFavorite', async (data: toggleFavoriteData, thunkAPI) => {
    let state = thunkAPI.getState() as RootState;
    let favorites = state.advertisements.advertisements.favorites;

    let advertisements = state.advertisements.advertisements.ads;
    let newads = advertisements!.map(ad => ad.id == data.id ? { ...ad, isFavorited: !ad.isFavorited } : ad)
    thunkAPI.dispatch(setAdvertisements({ ads: [...newads], myads: state.advertisements.advertisements.myads, favorites: state.advertisements.advertisements.favorites }));

    if (favorites) {
        if (!favorites.includes(data.id)) {
            thunkAPI.dispatch(setFavorites([...favorites, data.id]));
        }
        else {
            let favoritesCopy = [...favorites]
            let newFavorites = favoritesCopy.filter(x => x != data.id);
            thunkAPI.dispatch(setFavorites(newFavorites));
        }
    }

    api.poke(
        {
            app: 'classifieds',
            mark: 'classifieds-action',
            json: {
                'toggle-favorite': {
                    'id': data.id
                }
            },
        }
    );

});

const advertisementsSlice = createSlice({
    name: "advertisements",
    initialState,
    reducers: {
        setAdvertisements: (state, action) => {
            state.advertisements = action.payload;
        },
        setFavorites: (state, action) => {
            state.advertisements.favorites = action.payload;
        }
    },
});

export const { setAdvertisements, setFavorites } = advertisementsSlice.actions;
export default advertisementsSlice.reducer;