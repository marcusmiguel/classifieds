import React from "react";
import { TabContent } from "../../types";
import { ChatIcon, FavoritesIcon, MyAdsIcon, PublishAdIcon, SidebarContainer, Tab, Tabs, TheiAdsIcon, Title } from "./style";
import { sigil, reactRenderer } from '@tlon/sigil-js'
import api from "../../api";

interface SidebarProps {
    setContentFunc: Function,
}

export const Sidebar = ({ setContentFunc }: SidebarProps) => {

    const handleTabClick = (e) => {
        e.preventDefault();
        document.querySelectorAll("a.active").forEach(a => a.classList.remove("active"));
        e.currentTarget.classList.toggle('active');

        if (e.currentTarget.dataset.value == TabContent.theirAds) {
            setContentFunc(TabContent[TabContent.theirAds]);
        }
        else if (e.currentTarget.dataset.value == TabContent.myads) {
            setContentFunc(TabContent[TabContent.myads]);
        }
        else if (e.currentTarget.dataset.value == TabContent.publishAd) {
            setContentFunc(TabContent[TabContent.publishAd]);
        }
        else if (e.currentTarget.dataset.value == TabContent.chat) {
            setContentFunc(TabContent[TabContent.chat]);
        }

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

    };

    return (
        <SidebarContainer>
            <Title>Classifieds</Title>
            <Tabs>
                <Tab href="#" data-value={TabContent.theirAds} className="active" onClick={handleTabClick}><TheiAdsIcon />Their Ads</Tab>
                <Tab href="#" data-value={TabContent.myads} onClick={handleTabClick}><MyAdsIcon />My Ads</Tab>
                <Tab href="#" data-value={TabContent.chat} onClick={handleTabClick}><ChatIcon />Chats</Tab>
                <Tab href="#" data-value={TabContent.publishAd} onClick={handleTabClick}><PublishAdIcon />Publish Ad</Tab>
            </Tabs>

        </SidebarContainer>
    )
};