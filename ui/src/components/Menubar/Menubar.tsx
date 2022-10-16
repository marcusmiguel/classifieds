import React from "react";
import { ChatIcon, FavoritesIcon, MyAdsIcon, PublishAdIcon, MenubarContainer, Tab, Tabs, TheiAdsIcon, Title, TabText } from "./style";
import { sigil, reactRenderer } from '@tlon/sigil-js'
import api from "../../api";

export const Menubar = () => {
    return (
        <MenubarContainer>
            <Title>Classifieds</Title>
            <Tabs>
                <Tab to="/ads" ><TheiAdsIcon /><TabText>Ads</TabText></Tab>
                <Tab to="/myads" ><MyAdsIcon /><TabText>My Ads</TabText></Tab>
                <Tab to="/chat" ><ChatIcon /><TabText>Chat</TabText></Tab>
                <Tab to="/newad" ><PublishAdIcon /><TabText>New Ad</TabText></Tab>
            </Tabs>
        </MenubarContainer>
    )
};