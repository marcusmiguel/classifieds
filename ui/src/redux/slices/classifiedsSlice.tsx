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

interface publishAdData {
    formValues: {
        title: string,
        desc: string,
        forward: boolean,
        images: string[],
        price: string
    }
}

interface editAdData {
    id: string,
    title: string | null,
    desc: string | null
    forward: boolean | null,
    price: string | null,
    images: string[] | null,
}

interface sendMessageData {
    "advertisement-id": string,
    to: string;
    text: string,

}

export const loadState = createAsyncThunk('loadAds', async (data, thunkAPI) => {

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
        thunkAPI.dispatch(setChats(sortedChats));
    }

    const receiveAds = (data) => {
        thunkAPI.dispatch(setAds(data.ads.reverse()));
    }

    const receiveMyAds = (data) => {
        thunkAPI.dispatch(setMyAds(data.myads.reverse()));
    }

    const receiveFavorites = (data) => {
        thunkAPI.dispatch(setFavorites(data.favorites));
    }

    await api.subscribe({
        app: 'classifieds',
        path: '/ads',
        err: () => { },
        event: (data) => receiveAds(data),
        quit: () => { }
    })

    await api.subscribe({
        app: 'classifieds',
        path: '/myads',
        err: () => { },
        event: (data) => receiveMyAds(data),
        quit: () => { }
    })

    await api.subscribe({
        app: 'classifieds',
        path: '/chats',
        err: () => { },
        event: (data) => receiveChats(data),
        quit: () => { }
    })

    await api.subscribe({
        app: 'classifieds',
        path: '/favorites',
        err: () => { },
        event: (data) => receiveFavorites(data),
        quit: () => { }
    })


}
);

export const publishAd = createAsyncThunk('publishAd', async (data: publishAdData, thunkAPI) => {
    api.poke(
        {
            app: 'classifieds',
            mark: 'classifieds-action',
            json: {
                'publish-ad': {
                    'title': data.formValues.title,
                    'desc': data.formValues.desc,
                    'price': data.formValues.price,
                    'forward': data.formValues.forward,
                    'images': data.formValues.images
                }
            },
        }
    );
});

export const editAd = createAsyncThunk('editAd', async (data: editAdData, thunkAPI) => {
    api.poke(
        {
            app: 'classifieds',
            mark: 'classifieds-action',
            json: {
                'edit-ad': {
                    'id': data.id,
                    'title': data.title,
                    'desc': data.desc,
                    'price': data.price,
                    'forward': data.forward,
                    'images': data.images
                }
            },
        }
    );
});

export const deleteAd = createAsyncThunk('toggleFavorite', async (data: deleteAdData, thunkAPI) => {
    // let state = thunkAPI.getState() as RootState;;
    // thunkAPI.dispatch(setMyAds(state.classifieds.data.myads?.filter(x => x.id != data.id)));

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

export const sendMessage = createAsyncThunk('sendMessage', async (data: sendMessageData, thunkAPI) => {
    api.poke(
        {
            app: 'classifieds',
            mark: 'classifieds-action',
            json: {
                'send-message': {
                    'advertisement-id': data["advertisement-id"],
                    'to': data.to,
                    'text': data.text,
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