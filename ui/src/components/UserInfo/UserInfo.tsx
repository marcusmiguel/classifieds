import { sigil, reactRenderer } from "@tlon/sigil-js"
import React from "react"
import api from "../../api"
import { UserInfoContainer, ShipName, ShipInfo } from "./style"

export const UserInfo = () => {
    return (
        <UserInfoContainer>
            {/* <NotificationButton id="notificationBtn" onClick={handleNotificationsButtonClick}>
                  {unreadNotifications.length > 0 && <Unread />}
                  <NotificationIcon />
              </NotificationButton> */}
            {api.ship ?
                <ShipInfo>
                    {api.ship.length <= 14 &&
                        sigil({
                            patp: api.ship,
                            renderer: reactRenderer,
                            size: 20,
                            colors: ['white', 'black'],
                        })
                    }
                    <ShipName>~{api.ship}</ShipName>
                </ShipInfo>
                :
                <ShipInfo>
                    <ShipName>Connecting to ship...</ShipName>
                </ShipInfo>
            }
            {/* {displayNotifications && <NotificationsModal notifications={unreadNotifications} setDisplayNotifications={setDisplayNotifications} setAdToShowById={setAdToShowById} setNotifications={setUnreadNotifications}></NotificationsModal>} */}
        </UserInfoContainer>
    )
}


