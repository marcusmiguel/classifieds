import { reactRenderer, sigil } from "@tlon/sigil-js";
import React, { useEffect, useRef, useState } from "react";
import { Advertisement, Mutual } from "../../types";
import { CloseIcon, ForwardModalBox, ForwardModalContainer, MutualInfo, MutualRow, MutualsList, NoResults, SearchBar, SearchContainer, SearchIcon, SendButton, SendIcon, SentButton, SentIcon, Ship, Title, UpperRow } from "./style";

interface ForwardModalProps {
    setDisplayForwardModal: Function,
    ad: Advertisement
}

export const ForwardModal = ({ setDisplayForwardModal, ad }: ForwardModalProps) => {

    const [hardCodedMutuals, setHardCodedMutuals] = useState<Mutual[]>([{ ship: "~fidwed-sipwyn", forwardedAds: [] },
    { ship: '~harlys-forbec', forwardedAds: [] },
    { ship: '~haspet-mattel', forwardedAds: [] },
    { ship: '~doppex-hobred', forwardedAds: [] },
    { ship: '~doswed-hanpur', forwardedAds: [] },
    { ship: '~bisrym-dirluc', forwardedAds: [] },
    { ship: '~dirluc-bisrym', forwardedAds: [] },
    { ship: '~hanpur-doswed', forwardedAds: [] }])

    const [mutualsQuery, setMutualsQuery] = useState('');
    const [debouncedMutualsQuery, setDebouncedMutualsQuery] = useState(mutualsQuery);
    const [queriedMutuals, setQueriedMutuals] = useState(hardCodedMutuals);

    const handleSearchMutualsQueryChange = (e) => {
        const { value } = e.target;
        setDebouncedMutualsQuery(value);
    };

    useEffect(() => {
        const timer = setTimeout(() => setMutualsQuery(debouncedMutualsQuery), 300);
        return () => clearTimeout(timer);
    }, [debouncedMutualsQuery])

    useEffect(() => {
        setQueriedMutuals([...hardCodedMutuals])
    }, [hardCodedMutuals])

    useEffect(() => {
        let queryIsEmpty = mutualsQuery.trim().length == 0;

        queryIsEmpty ?
            setQueriedMutuals(hardCodedMutuals)
            :
            setQueriedMutuals(hardCodedMutuals?.filter(x => x.ship.toLowerCase().includes(mutualsQuery.toLowerCase())));
    }, [mutualsQuery, queriedMutuals])

    const handleSendAd = (ship: string, ad: Advertisement) => {
        let copyHardCodedMutuals = [...hardCodedMutuals];
        copyHardCodedMutuals = copyHardCodedMutuals.map(x => x.ship == ship ? { ...x, forwardedAds: [...x.forwardedAds, ad] } : x);
        setHardCodedMutuals(copyHardCodedMutuals);
    }

    const handleForwardContainerClick = (e) => {
        if (e.target == document.getElementById('confirmModalContainer')) {
            setDisplayForwardModal(false)
        }
    }

    return (
        <ForwardModalContainer id="confirmModalContainer" onClick={handleForwardContainerClick}>
            <ForwardModalBox>
                <UpperRow>
                    <Title>Forward Ad</Title>
                    <CloseIcon onClick={() => setDisplayForwardModal(false)}></CloseIcon>
                </UpperRow>
                <SearchContainer><SearchIcon /><SearchBar placeholder="Search" onChange={handleSearchMutualsQueryChange} /></SearchContainer>
                <MutualsList>
                    {
                        (queriedMutuals.length == 0 && mutualsQuery != '') ?
                            <NoResults>No results for "{mutualsQuery}".</NoResults>
                            :
                            queriedMutuals?.map((mutual: Mutual, index) =>
                                <MutualRow key={index}>
                                    <MutualInfo>
                                        {
                                            sigil({
                                                patp: mutual.ship,
                                                renderer: reactRenderer,
                                                size: 25,
                                                colors: ['white', 'black'],
                                            })
                                        }
                                        <Ship>{mutual.ship}</Ship>
                                    </MutualInfo>
                                    {
                                        mutual.forwardedAds.includes(ad) ?
                                            <SentButton >
                                                <SentIcon />Sent
                                            </SentButton>
                                            :
                                            <SendButton onClick={() => handleSendAd(mutual.ship, ad)}>
                                                <SendIcon />Send
                                            </SendButton>
                                    }
                                </MutualRow>
                            )
                    }
                </MutualsList>
            </ForwardModalBox>
        </ForwardModalContainer >
    )
}
