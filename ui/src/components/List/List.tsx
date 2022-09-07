import { sigil, reactRenderer } from "@tlon/sigil-js";
import React, { useEffect, useState } from "react";
import { Advertisement, NotificationMessages, TabContent, Notification } from "../../types";
import { Card } from "../Card/Card";
import { Details } from "../Details/Details";
import { Pagination } from "../Pagination/Pagination";
import { Dropdown, DropdownIcon, DropdownModal, DropdownOption, DropdownText, FilterUpperRow, ListContainer, ListGrid, NotificationButton, NotificationIcon, SearchBar, SearchContainer, SearchIcon, ShipName, Tag, Tags, Title, Unread, UpperRow, UserInfo, UserInfoContainer, } from './style';
import { NotificationsModal } from "../NotificationsModal/NotificationsModal";
import moment from "moment";
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import api from "../../api";

interface ListProps {
    ads: Advertisement[] | null,
    contentToShow: string
}

export const List = ({ ads, contentToShow }: ListProps) => {
    const [currentAds, setCurrentAds] = useState<Advertisement[]>([]);
    const [forwardedAds, setForwardedAds] = useState<Advertisement[]>([]);
    const { favorites } = useAppSelector((state) => state.advertisements.advertisements);

    const [adToShow, setAdToShow] = useState<Advertisement>();
    const [adsQuery, setQuery] = useState('');
    const [debouncedAdsQuery, setDebouncedAdsQuery] = useState(adsQuery);
    const [queriedAds, setQueriedAds] = useState<Advertisement[]>([]);

    useEffect(() => {
        if (ads) {
            setQueriedAds(ads)
        }
        console.log(ads)
    }, [ads]);

    useEffect(() => {
        setAdToShowById(adToShow?.id)
    }, [favorites]);

    const [dropdownContent, setDropdownContent] = useState('All');
    const [displayDropdownModal, setDisplayDropdownModal] = useState(false);

    const [displayNotifications, setDisplayNotifications] = useState(false);

    let hardcodedNotifications: Notification[] = [];
    if (ads && ads != null && ads?.length > 1) {
        hardcodedNotifications = [{ ship: '~harlys-forbec', text: NotificationMessages.newForwardedAd, date: moment!.utc()!.format(), advertisementId: ads[0].id }, { ship: '~fidwed-sipwyn', text: NotificationMessages.newMessage, date: moment!.utc()!.format(), advertisementId: ads[1].id }]
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

    const setAdToShowById = (id) => {
        let ad = ads?.filter(x => x.id == id)!;
        setAdToShow(ad[0]);
    }

    useEffect(() => {
        const timer = setTimeout(() => setQuery(debouncedAdsQuery), 300);
        return () => clearTimeout(timer);
    }, [debouncedAdsQuery])

    useEffect(() => {
        let queryIsEmpty = adsQuery.trim().length == 0;
        if (ads == null || ads?.length == 0) return;

        let newAds = [...ads];

        if (dropdownContent == 'Favorites' && favorites) {
            newAds = ads?.filter(x => x.isFavorited);
        }
        if (dropdownContent == 'Forwarded') {
            newAds = forwardedAds;
        }

        queryIsEmpty ?
            setQueriedAds(newAds)
            :
            setQueriedAds(newAds?.filter(x => x.title.toLowerCase().includes(adsQuery.toLowerCase()) || x.ship.toLowerCase().includes(adsQuery.toLowerCase()) || x.desc.toLowerCase().includes(adsQuery.toLowerCase())))
    }, [adsQuery, dropdownContent])

    const handleNotificationsButtonClick = (e) => {
        setDisplayNotifications(!displayNotifications);
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
                <Title>{contentToShow == TabContent[TabContent.ads] && 'Ads'}
                    {contentToShow == TabContent[TabContent.myads] && 'My Ads'}
                </Title>
                <UserInfoContainer>
                    <NotificationButton id="notificationBtn" onClick={handleNotificationsButtonClick}>
                        {unreadNotifications.length > 0 && <Unread />}
                        <NotificationIcon />
                    </NotificationButton>
                    <UserInfo>
                        {
                            sigil({
                                patp: api.ship!,
                                renderer: reactRenderer,
                                size: 20,
                                colors: ['white', 'black'],
                            })
                        }
                        <ShipName>{api.ship}</ShipName>
                    </UserInfo>
                    {displayNotifications && <NotificationsModal notifications={unreadNotifications} setDisplayNotifications={setDisplayNotifications} setAdToShowById={setAdToShowById} setNotifications={setUnreadNotifications}></NotificationsModal>}
                </UserInfoContainer>
            </UpperRow>{
                (contentToShow == TabContent[TabContent.ads]) &&
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
            {adToShow && <Details contentToShow={contentToShow} advertisement={adToShow} setAd={setAdToShow} />}
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

