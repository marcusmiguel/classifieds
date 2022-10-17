import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate, } from "react-router-dom";
import { ChatIcon, MyAdsIcon, PublishAdIcon, MenubarContainer, Tab, Tabs, TheiAdsIcon, Title, TabText } from "./style";

export const Menubar = () => {
    const location = useLocation();
    const valueRef = useRef(location.pathname);
    const navigate = useNavigate();

    useEffect(() => {
        valueRef.current = location.pathname;
    }, [location]);

    useEffect(() => {
        const checkDirection = () => {

            const currentPath = valueRef.current;
            if (currentPath.includes('/0v') && !currentPath.includes('/chat')) return;

            let touchstartX = document.body.getAttribute('touchstartX');
            let touchendX = document.body.getAttribute('touchendX');
            if (!touchstartX || !touchendX) return;

            let diff = +touchendX - (+touchstartX);
            if (diff < 60 && diff > -60) return;

            if (touchstartX < touchendX) {
                if (currentPath.includes('/ads')) return;
                else if (currentPath.includes('/myads')) navigate('/ads');
                else if (currentPath.includes('/chat')) navigate('/myads');
                else if (currentPath.includes('/newad')) navigate('/chat');
            }
            else if (touchstartX > touchendX) {
                if (currentPath.includes('/ads')) navigate('/myads');
                else if (currentPath.includes('/myads')) navigate('/chat');
                else if (currentPath.includes('/chat')) navigate('/newad');
                else if (currentPath.includes('/newad')) return;
            }
        };

        document.addEventListener('touchstart', e => {
            document.body.setAttribute('touchstartX', '' + e.changedTouches[0].screenX);
        });

        document.addEventListener('touchend', e => {
            document.body.setAttribute('touchendX', '' + e.changedTouches[0].screenX);
            checkDirection()
        });
    }, []);

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