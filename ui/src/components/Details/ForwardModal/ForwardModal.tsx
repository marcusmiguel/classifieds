import { reactRenderer, sigil } from "@tlon/sigil-js";
import React, { useEffect, useRef, useState } from "react";
import { Advertisement, Mutual } from "../../../types";
import { CloseIcon, ForwardModalBox, ForwardModalContainer, MutualInfo, MutualRow, MutualsList, NoResults, SearchBar, SearchContainer, SearchIcon, SendButton, SendIcon, SentButton, SentIcon, Ship, Title, UpperRow } from "./style";

interface ForwardModalProps {
    setDisplayForwardModal: Function,
    advertisement: Advertisement
}

export const ForwardModal = ({ setDisplayForwardModal, advertisement }: ForwardModalProps) => {

    const [hardCodedMutuals, setHardCodedMutuals] = useState<Mutual[]>([{ ship: "~fidwed-sipwyn", forwardedAdsId: [] },
    { ship: '~harlys-forbec', forwardedAdsId: [] },
    { ship: '~haspet-mattel', forwardedAdsId: [] },
    { ship: '~doppex-hobred', forwardedAdsId: [] },
    { ship: '~doswed-hanpur', forwardedAdsId: [] },
    { ship: '~bisrym-dirluc', forwardedAdsId: [] },
    { ship: '~dirluc-bisrym', forwardedAdsId: [] },
    { ship: '~hanpur-doswed', forwardedAdsId: [] }])

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
        copyHardCodedMutuals = copyHardCodedMutuals.map(x => x.ship == ship ? { ...x, forwardedAdsId: [...x.forwardedAdsId, ad.id] } : x);
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
                                        mutual.forwardedAdsId.includes(advertisement.id) ?
                                            <SentButton >
                                                <SentIcon />Sent
                                            </SentButton>
                                            :
                                            <SendButton onClick={() => handleSendAd(mutual.ship, advertisement)}>
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
