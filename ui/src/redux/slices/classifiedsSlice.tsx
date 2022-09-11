import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import moment from "moment";
import { RootState } from "..";
import api from "../../api";
import { Advertisement, Chat, Favorite } from "../../types";
import { daToDate } from "../../util";

interface ClassifiedsState {
    data: {
        ads: Advertisement[] | null,
        myads: Advertisement[] | null,
        favorites: Favorite[] | null,
        chats: Chat[] | null,
    }
};

const initialState: ClassifiedsState = {
    data: {
        ads: null,
        myads: null,
        favorites: null,
        chats: null,
    }
};

interface toggleFavoriteData {
    id: string,
}

interface deleteAdData {
    id: string,
}

interface receiveChatsData {
    chats: Chat[],
}

export const loadState = createAsyncThunk('loadAds', async (data, thunkAPI) => {
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
    });

    const sortedData = {
        ads: [...newads.reverse()],
        myads: [...res.myads.reverse()],
        favorites: res.favorites,
    };
    thunkAPI.dispatch(setState(sortedData));

    await api.subscribe({
        app: 'classifieds',
        path: '/chats',
        err: () => { },
        event: (data) => receiveChats(data),
        quit: () => { }
    })

    const receiveChats = (data) => {
        let state = thunkAPI.getState() as RootState;

        const getTitle = (advertisementId) => {
            let notmine = state.classifieds.data.ads?.filter(ad => ad.id == advertisementId);
            if (notmine && notmine?.length > 0)
                return notmine[0].title

            let mine = state.classifieds.data.myads?.filter(ad => ad.id == advertisementId);
            if (mine && mine?.length > 0)
                return mine[0].title

            return undefined;
        }

        let titledChats = [...data.chats.map(chat => { return { ...chat, title: getTitle(chat['advertisement-id']) } })];
        let sortedChats = [...titledChats.sort((a, b) => (daToDate(b.msgs.slice(-1)[0].date).diff(daToDate(a.msgs.slice(-1)[0].date))))];
        console.log(sortedChats);
        thunkAPI.dispatch(setChats(sortedChats));
    }

});


export const deleteAd = createAsyncThunk('toggleFavorite', async (data: deleteAdData, thunkAPI) => {
    let state = thunkAPI.getState() as RootState;
    let newmyads = state.classifieds.data.myads?.filter(ad => ad.id != data.id);
    thunkAPI.dispatch(setMyAds(newmyads));
    api.poke(
        {
            app: 'classifieds',
            mark: 'classifieds-action',
            json: {
                'delete-ad': {
                    'id': data.id,
                }
            },
        }
    );
});

export const toggleFavorite = createAsyncThunk('toggleFavorite', async (data: toggleFavoriteData, thunkAPI) => {
    let state = thunkAPI.getState() as RootState;
    let favorites = state.classifieds.data.favorites;

    let advertisements = state.classifieds.data.ads;
    let newads = advertisements!.map(ad => ad.id == data.id ? { ...ad, isFavorited: !ad.isFavorited } : ad)
    thunkAPI.dispatch(setAds([...newads]));

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

const classifiedsSlice = createSlice({
    name: "classifieds",
    initialState,
    reducers: {
        setState: (state, action) => {
            state.data = action.payload;
        },
        setAds: (state, action) => {
            state.data.ads = action.payload;
        },
        setMyAds: (state, action) => {
            state.data.myads = action.payload;
        },
        setFavorites: (state, action) => {
            state.data.favorites = action.payload;
        },
        setChats: (state, action) => {
            state.data.chats = action.payload;
        }
    },
});

export const { setState, setAds, setMyAds, setFavorites, setChats } = classifiedsSlice.actions;
export default classifiedsSlice.reducer;