import React, { useEffect, useState } from "react";
import { Advertisement, NotificationMessages, Notification } from "../../types";
import { Card } from "../Card/Card";
import { Pagination } from "../Pagination/Pagination";
import { Dropdown, DropdownIcon, DropdownModal, DropdownOption, DropdownText, EmptyListMessage, FilterUpperRow, ListContainer, ListGrid, SearchBar, SearchContainer, SearchIcon, Tag, Tags, Title, } from './style';
import { useAppSelector } from '../../redux/hooks/hooks';
import { locationHasPath } from "../../util";
import { useParams } from "react-router-dom";

interface ListProps {
    listAds: Advertisement[] | null,
};

export const List = ({ listAds }: ListProps) => {

    const [adsToShow, setAdsToShow] = useState<Advertisement[]>([]);
    const [forwardedAds, setForwardedAds] = useState<Advertisement[]>([]);
    const { favorites } = useAppSelector((state) => state.classifieds.data);
    const [adsQuery, setQuery] = useState('');
    const [debouncedAdsQuery, setDebouncedAdsQuery] = useState(adsQuery);
    const [queriedAds, setQueriedAds] = useState<Advertisement[] | null>(listAds);
    const [dropdownContent, setDropdownContent] = useState('All');
    const [displayDropdownModal, setDisplayDropdownModal] = useState(false);
    // const [displayNotifications, setDisplayNotifications] = useState(false);

    // let hardcodedNotifications: Notification[] = [];
    // if (listAds && listAds != null && listAds?.length > 1) {
    //     hardcodedNotifications = [{ ship: '~harlys-forbec', text: NotificationMessages.newForwardedAd, date: moment!.utc()!.format(), "advertisement-id": listAds[0].id }, { ship: '~fidwed-sipwyn', text: NotificationMessages.newMessage, date: moment!.utc()!.format(), "advertisement-id": listAds[1].id }]
    // }
    // const [unreadNotifications, setUnreadNotifications] = useState(hardcodedNotifications);

    const onPageChanged = data => {
        const { newCurrentPage, newPageLimit } = data;
        const offset = (newCurrentPage - 1) * newPageLimit;
        const newCurrentAds = queriedAds!.slice(offset, offset + newPageLimit);
        setAdsToShow([...newCurrentAds]);
    };

    const handleSearchAdsQueryChange = (e) => {
        const { value } = e.target;
        setDebouncedAdsQuery(value);
    };

    useEffect(() => {
        const timer = setTimeout(() => setQuery(debouncedAdsQuery), 300);
        return () => clearTimeout(timer);
    }, [debouncedAdsQuery])

    useEffect(() => {
        let queryIsEmpty = adsQuery.trim().length == 0;
        if (listAds == null || listAds?.length == 0) return;

        let newAds = [...listAds];

        if (dropdownContent == 'Favorites' && favorites) {
            newAds = listAds?.filter(x => favorites.includes(x.id));
        }
        if (dropdownContent == 'Forwarded') {
            newAds = forwardedAds;
        }

        queryIsEmpty ?
            setQueriedAds(newAds)
            :
            setQueriedAds(newAds?.filter(x => x.title.toLowerCase().includes(adsQuery.toLowerCase()) || x.ship.toLowerCase().includes(adsQuery.toLowerCase()) || x.desc.toLowerCase().includes(adsQuery.toLowerCase())))
    }, [adsQuery, dropdownContent])

    // const handleNotificationsButtonClick = (e) => {
    //     setDisplayNotifications(!displayNotifications);
    // };

    useEffect(() => {
        document.body.style.overflowY = "auto";

        document.addEventListener(
            "click",
            function (event) {
                var clicked = event.target as Element;
                var dropdown = document.getElementById('dropdown')

                if (
                    clicked != dropdown && !dropdown?.contains(clicked)
                ) {
                    setDisplayDropdownModal(false)
                }
            },
            false
        )

    }, []);

    useEffect(() => {
        setQueriedAds(listAds)
    }, [listAds]);

    const renderTitle = () => {
        return (<>
            <Title>
                {locationHasPath('/ads') && 'Ads'}
                {locationHasPath('/myads') && 'My Ads'}
            </Title>
            {
                locationHasPath('/ads') &&
                <FilterUpperRow><SearchContainer><SearchIcon /><SearchBar placeholder="Search" value={debouncedAdsQuery} onChange={handleSearchAdsQueryChange} /></SearchContainer>
                    <Dropdown id="dropdown" onClick={() => setDisplayDropdownModal(!displayDropdownModal)}>
                        <DropdownText>{dropdownContent}</DropdownText>
                        <DropdownIcon />
                        {displayDropdownModal && <DropdownModal>
                            <DropdownOption onClick={() => setDropdownContent('All')}>All</DropdownOption>
                            <DropdownOption onClick={() => setDropdownContent('Favorites')}>Favorites</DropdownOption>
                            {/* <DropdownOption onClick={() => setDropdownContent('Forwarded')}>Forwarded</DropdownOption> */}
                        </DropdownModal>
                        }
                    </Dropdown>
                </FilterUpperRow>
                // <Tags><Tag className="active">Electronics</Tag><Tag>Books</Tag><Tag>TagThree</Tag><Tag>TagFour</Tag>
                //     <Tag>TagFive</Tag><Tag>TagSix</Tag></Tags> 
            }
        </>)
    }

    return (
        <>
            <ListContainer>
                {renderTitle()}
                <ListGrid>
                    {listAds && listAds.length > 0 ?
                        (
                            (queriedAds?.length == 0) ?
                                <EmptyListMessage>No results found.</EmptyListMessage>
                                :
                                adsToShow?.map((ad, index) =>
                                    < Card key={index} advertisement={ad} />
                                )
                        )
                        :
                        <EmptyListMessage>There are no ads to show.</EmptyListMessage>
                    }
                </ListGrid >
                <Pagination records={queriedAds} pageLimit={14} pageNeighbours={2} onPageChanged={onPageChanged} />
            </ListContainer>
        </>
    );
};

