import React, { useEffect, useState } from "react"
import { LIST_ACTIONS } from "../ListReducer";
import { SearchContainer, SearchIcon, SearchInput } from "./style"

interface SearchBarProps {
        dispatch: React.Dispatch<any>,
}

export const SearchBar = ({ dispatch }: SearchBarProps) => {

        const [adsQuery, setQuery] = useState('');

        const handleSearchAdsQueryChange = (e) => {
                const { value } = e.target;
                setQuery(value);
        };

        useEffect(() => {
                const timer = setTimeout(() => dispatch({ type: LIST_ACTIONS.TOGGLE_SEARCH_QUERY, payload: adsQuery }), 500);
                return () => clearTimeout(timer);
        }, [adsQuery])

        return (
                <SearchContainer><SearchIcon /><SearchInput placeholder="Search" value={adsQuery} onChange={handleSearchAdsQueryChange} /></SearchContainer>
        )

}