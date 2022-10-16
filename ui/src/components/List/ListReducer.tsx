import { Advertisement } from "../../types";
import { DropdownOption } from "./Dropdown/Dropdown";

export const LIST_ACTIONS = {
    TOGGLE_SEARCH_QUERY: 'toggle_search_query',
    TOGGLE_DROPDOWN_OPTION: 'toggle_dropdown_option',
    GO_TO_PAGE: 'go_to_page',
    SET_ALL_ADS: 'set_all_ads'
};

interface ListState {
    allAds: Advertisement[] | null,
    dropdownContent: DropdownOption,
    adsQuery: string,
    queriedAds: Advertisement[] | null,
    currentPageAds: Advertisement[] | null,
    favorites: string[] | null,
};

export interface ListReducerAction {
    type: string,
    payload: any, // TODO: finish this
};

export const listReducer = (state: ListState, action: ListReducerAction): ListState => {
    if (action.type == LIST_ACTIONS.SET_ALL_ADS) {
        return { ...state, allAds: action.payload, queriedAds: action.payload };
    }
    else if (action.type == LIST_ACTIONS.TOGGLE_SEARCH_QUERY) {
        if (!state.allAds) return { ...state, adsQuery: action.payload };

        let adsQuery = action.payload;
        let adsToQuery = state.allAds;

        if (state.dropdownContent == 'Favorites') {
            adsToQuery = adsToQuery?.filter(x => state.favorites?.includes(x.id));
        };

        return {
            ...state,
            adsQuery: action.payload,
            queriedAds: adsToQuery.filter(x => x.title.toLowerCase().includes(adsQuery.toLowerCase())
                || x.ship.toLowerCase().includes(adsQuery.toLowerCase())
                || x.desc.toLowerCase().includes(adsQuery.toLowerCase())),
        };
    }
    else if (action.type == LIST_ACTIONS.TOGGLE_DROPDOWN_OPTION) {
        if (!state.allAds) return { ...state, dropdownContent: action.payload };

        let adsQuery = state.adsQuery;
        let adsToQuery = state.allAds;

        if (action.payload == 'Favorites') {
            adsToQuery = adsToQuery?.filter(x => state.favorites?.includes(x.id));
        };

        return {
            ...state,
            dropdownContent: action.payload,
            queriedAds: adsToQuery.filter(x => x.title.toLowerCase().includes(adsQuery.toLowerCase())
                || x.ship.toLowerCase().includes(adsQuery.toLowerCase())
                || x.desc.toLowerCase().includes(adsQuery.toLowerCase())),
        };
    }
    else if (action.type == LIST_ACTIONS.GO_TO_PAGE) {
        if (!state.queriedAds) return state;

        const { newCurrentPage, newPageLimit } = action.payload;
        const offset = (newCurrentPage - 1) * newPageLimit;
        const newCurrentAds = state.queriedAds.slice(offset, offset + newPageLimit);
        return { ...state, currentPageAds: newCurrentAds };
    }
    else {
        return state;
    }
};