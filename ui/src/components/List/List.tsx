import React, { useEffect, useReducer, } from "react";
import { Advertisement, } from "../../types";
import { Card } from "./Card/Card";
import { Pagination } from "../Pagination/Pagination";
import { EmptyListMessage, FilterRowContainer, ListContainer, ListGrid, Tag, Tags, Title, } from './style';
import { useAppSelector } from '../../redux/hooks/hooks';
import { Outlet } from "react-router-dom";
import { SearchBar } from "./SearchBar/SearchBar";
import { Dropdown } from "./Dropdown/Dropdown";
import { listReducer, LIST_ACTIONS } from "./ListReducer";

interface ListProps {
    listAds: Advertisement[] | null,
};

export const List = ({ listAds }: ListProps) => {

    const { favorites } = useAppSelector((state) => state.classifieds.data);
    const [state, dispatch] = useReducer(listReducer, { allAds: listAds, dropdownContent: 'All', adsQuery: '', queriedAds: listAds, currentPageAds: [], favorites: favorites });

    useEffect(() => {
        document.body.style.overflowY = "auto";
    }, []);

    useEffect(() => {
        dispatch({ type: LIST_ACTIONS.SET_ALL_ADS, payload: listAds });
    }, [listAds]);

    return (
        <>
            <ListContainer>
                <Title>
                    {location.pathname.indexOf('/ads') > -1 ? 'Ads' :
                        'My Ads'}
                </Title>
                {location.pathname.indexOf('/ads') > -1 &&
                    <FilterRowContainer>

                        <SearchBar dispatch={dispatch}></SearchBar>
                        <Dropdown dispatch={dispatch}></Dropdown>
                        {/*  <Tags><Tag className="active">Electronics</Tag><Tag>Books</Tag><Tag>TagThree</Tag><Tag>TagFour</Tag>
                    <Tag>TagFive</Tag><Tag>TagSix</Tag></Tags> */}
                    </FilterRowContainer>}
                <ListGrid>
                    {listAds && listAds.length > 0 ?
                        (
                            (state.currentPageAds?.length == 0) ?
                                <EmptyListMessage>No results found.</EmptyListMessage>
                                :
                                state.currentPageAds?.map((ad, index) =>
                                    < Card key={ad.id} advertisement={ad} />
                                )
                        )
                        :
                        <EmptyListMessage>There are no ads to show.</EmptyListMessage>
                    }
                </ListGrid >
                <Pagination records={state.queriedAds} pageLimit={14} pageNeighbours={2} dispatch={dispatch} />
            </ListContainer>
            <Outlet />
        </>
    );
};


    // const [forwardedAds, setForwardedAds] = useState<Advertisement[]>([]);
    // const [displayNotifications, setDisplayNotifications] = useState(false);
    // let hardcodedNotifications: Notification[] = [];
    // if (listAds && listAds != null && listAds?.length > 1) {
    //     hardcodedNotifications = [{ ship: '~harlys-forbec', text: NotificationMessages.newForwardedAd, date: moment!.utc()!.format(), "advertisement-id": listAds[0].id }, { ship: '~fidwed-sipwyn', text: NotificationMessages.newMessage, date: moment!.utc()!.format(), "advertisement-id": listAds[1].id }]
    // }
    // const [unreadNotifications, setUnreadNotifications] = useState(hardcodedNotifications);

    // const handleNotificationsButtonClick = (e) => {
    //     setDisplayNotifications(!displayNotifications);
    // };
