import { reactRenderer, sigil } from "@tlon/sigil-js";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Notification } from "../../types";
import { NotificationsContainer, NotificationsList, Title, NotificationCard, EmptyListMessage, NotificationSigil, NotificationColumn, NotificationAuthor, NotificationDate, NotificationText, NotificationsBackground } from "./style";

interface NotificationsProps {
    notifications: Notification[],
    setDisplayNotifications: Function,
    setAdToShowById: Function,
    setNotifications: Function,
}

export const NotificationsModal = ({ notifications, setDisplayNotifications, setAdToShowById, setNotifications }: NotificationsProps) => {
    useEffect(() => {
        document.addEventListener(
            "click",
            function (event) {
                var clicked = event.target as Element;
                var button = document.getElementById('notificationBtn');
                var modal = document.getElementById('notificationsModal');

                if (
                    clicked != modal && clicked != button && !modal?.contains(clicked) && !button?.contains(clicked)
                ) {
                    setDisplayNotifications(false)
                }
            },
            false
        )
    }, []);

    const handleNotificationClick = (notification: Notification) => {
        if (notifications) {
            setAdToShowById(notification.advertisementId);
            setDisplayNotifications(false);
            setNotifications([...notifications.filter(x => x != notification)]);
        }
    }

    return (
        <NotificationsContainer id='notificationsModal'>
            <Title>Notifications</Title>
            <NotificationsList>
                {
                    notifications.length == 0 ?
                        <EmptyListMessage>There are no notifications. </EmptyListMessage>
                        :
                        notifications?.map((notification, index) =>
                            < NotificationCard key={index} onClick={() => handleNotificationClick(notification)}>
                                <NotificationSigil>
                                    {
                                        sigil({
                                            patp: notification.ship,
                                            renderer: reactRenderer,
                                            size: 30,
                                            colors: ['white', 'black'],
                                        })
                                    }
                                </NotificationSigil>
                                <NotificationColumn>
                                    <NotificationText><NotificationAuthor>{notification.ship}</NotificationAuthor>
                                        {notification.text}
                                    </NotificationText>
                                    <NotificationDate>{moment.utc(notification.date).fromNow()}</NotificationDate>
                                </NotificationColumn>
                            </NotificationCard>
                        )
                }

            </NotificationsList>
        </NotificationsContainer>
    )
}