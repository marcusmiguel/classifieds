import { sigil, reactRenderer } from "@tlon/sigil-js";
import React, { useEffect, useState } from "react";
import { Advertisement, NotificationMessages, TabContent, Notification } from "../../types";
import { Card } from "../Card/Card";
import { Details } from "../Details/Details";
import { Pagination } from "../Pagination/Pagination";
import { Dropdown, DropdownIcon, DropdownModal, DropdownOption, DropdownText, FilterUpperRow, ListContainer, ListGrid, NotificationButton, NotificationIcon, SearchBar, SearchContainer, SearchIcon, ShipName, Tag, Tags, Title, Unread, UpperRow, UserInfo, UserInfoContainer, } from './style';
import { NotificationsModal } from "../NotificationsModal/NotificationsModal";
import moment from "moment";

interface ListProps {
    ads: Advertisement[] | null,
    contentToShow: string
}

export const List = ({ ads, contentToShow }: ListProps) => {
    const [currentAds, setCurrentAds] = useState<Advertisement[]>([]);
    const [favoriteAds, setFavoriteAds] = useState<Advertisement[]>([]);
    const [forwardedAds, setForwardedAds] = useState<Advertisement[]>([]);

    const [adToShow, setAdToShow] = useState();
    const [adsQuery, setQuery] = useState('');
    const [debouncedAdsQuery, setDebouncedAdsQuery] = useState(adsQuery);
    const [queriedAds, setQueriedAds] = useState(ads);

    const [dropdownContent, setDropdownContent] = useState('All');
    const [displayDropdownModal, setDisplayDropdownModal] = useState(false);

    const [displayNotifications, setDisplayNotifications] = useState(false);

    let hardcodedNotifications: Notification[] = []
    if (ads) {
        hardcodedNotifications = [{ author: '~harlys-forbec', text: NotificationMessages.newForwardedAd, date: moment!.utc()!.format(), ad: ads[0] }, { author: '~fidwed-sipwyn', text: NotificationMessages.newMessage, date: moment!.utc()!.format(), ad: ads[1] }]
    }
    const [unreadNotifications, setUnreadNotifications] = useState(hardcodedNotifications);

    const onPageChanged = data => {
        const { newCurrentPage, newPageLimit } = data;
        const offset = (newCurrentPage - 1) * newPageLimit;
        const newCurrentAds = queriedAds!.slice(offset, offset + newPageLimit);

        setCurrentAds([...newCurrentAds]);
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
        if (ads == null) return;

        let newAds = [...ads];

        if (dropdownContent == 'Favorites') {
            newAds = favoriteAds;
        }
        if (dropdownContent == 'Forwarded') {
            newAds = forwardedAds;
        }

        queryIsEmpty ?
            setQueriedAds(newAds)
            :
            setQueriedAds(newAds?.filter(x => x.title.toLowerCase().includes(adsQuery.toLowerCase()) || x.publisher.toLowerCase().includes(adsQuery.toLowerCase()) || x.desc.toLowerCase().includes(adsQuery.toLowerCase())))
    }, [adsQuery, dropdownContent])

    const handleNotificationsButtonClick = (e) => {
        setDisplayNotifications(!displayNotifications);
    };

    const handleFavButtonClick = (ad) => {
        if (!favoriteAds.includes(ad)) {
            setFavoriteAds([...favoriteAds, ad])
        }
        else {
            let favoritesCopy = [...favoriteAds]
            let newFavorites = favoritesCopy.filter(x => x.publisher != ad.publisher && x.title != ad.title);
            setFavoriteAds(newFavorites)
        }
    };

    useEffect(() => {
        document.body.style.overflow = "scroll";
        setAdToShow(undefined)
    }, [contentToShow]);

    useEffect(() => {
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

    const renderTitle = () => {
        return (<>
            <UpperRow>
                <Title>{contentToShow == TabContent[TabContent.theirAds] && 'Their Ads'}
                    {contentToShow == TabContent[TabContent.myads] && 'My ads'}
                </Title>
                <UserInfoContainer>
                    <NotificationButton id="notificationBtn" onClick={handleNotificationsButtonClick}>
                        {unreadNotifications.length > 0 && <Unread />}
                        <NotificationIcon />
                    </NotificationButton>
                    <UserInfo>
                        {
                            sigil({
                                patp: 'fidwed-sipwyn',
                                renderer: reactRenderer,
                                size: 20,
                                colors: ['white', 'black'],
                            })
                        }
                        <ShipName>~fidwed-sipwyn</ShipName>
                    </UserInfo>
                    {displayNotifications && <NotificationsModal notifications={unreadNotifications} setDisplayNotifications={setDisplayNotifications} setAdToShow={setAdToShow} setNotifications={setUnreadNotifications}></NotificationsModal>}
                </UserInfoContainer>
            </UpperRow>{
                (contentToShow == TabContent[TabContent.theirAds]) &&
                <><FilterUpperRow><SearchContainer><SearchIcon /><SearchBar placeholder="Search" value={debouncedAdsQuery} onChange={handleSearchAdsQueryChange} /></SearchContainer>
                    <Dropdown id="dropdown" onClick={() => setDisplayDropdownModal(!displayDropdownModal)}>
                        <DropdownText>{dropdownContent}</DropdownText>
                        <DropdownIcon />
                        {displayDropdownModal && <DropdownModal>
                            <DropdownOption onClick={() => setDropdownContent('All')}>All</DropdownOption>
                            <DropdownOption onClick={() => setDropdownContent('Favorites')}>Favorites</DropdownOption>
                            <DropdownOption onClick={() => setDropdownContent('Forwarded')}>Forwarded</DropdownOption>
                        </DropdownModal>
                        }
                    </Dropdown>
                </FilterUpperRow>
                    <Tags><Tag className="active">Electronics</Tag><Tag>Books</Tag><Tag>TagThree</Tag><Tag>TagFour</Tag>
                        <Tag>TagFive</Tag><Tag>TagSix</Tag></Tags> </>}
        </>)
    }

    return (
        <>
            {adToShow && <Details contentToShow={contentToShow} ad={adToShow} setAd={setAdToShow} handleFavButtonClick={handleFavButtonClick} favorites={favoriteAds} />}
            <ListContainer>
                {renderTitle()}
                <ListGrid>
                    {ads && ads.length > 0 ?
                        (
                            (queriedAds?.length == 0) ?
                                <div>No results found.</div>
                                :
                                currentAds?.map((ad, index) =>
                                    < Card key={index} advertisement={ad} setAdToShow={setAdToShow} />
                                )
                        )
                        :
                        <div>There are no ads to show.</div>
                    }
                </ListGrid >
                <Pagination records={queriedAds} pageLimit={14} pageNeighbours={2} onPageChanged={onPageChanged} />
            </ListContainer>
        </>
    );
};

