import React, { useEffect, useState } from "react";
import { Chats } from "../../components/Chats/Chats";
import { List } from "../../components/List/List";
import { PublishAd } from "../../components/PublishAd/PublishAd";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useAppSelector } from "../../redux/hooks/hooks";
import { Advertisement, TabContent } from "../../types";
import { HomeContainer } from "./style";

const Home = () => {
  const { ads, myads } = useAppSelector((state) => state.classifieds.data);
  const [contentToShow, setContentToShow] = useState(TabContent[TabContent.ads]);

  return (
    <HomeContainer>
      <Sidebar setContentFunc={setContentToShow} />
      {
        (contentToShow == TabContent[TabContent.ads])
        && <List listAds={ads} contentToShow={contentToShow} />
      }
      {(contentToShow == TabContent[TabContent.myads])
        && <List listAds={myads} contentToShow={contentToShow} />
      }
      {(contentToShow == TabContent[TabContent.newAd])
        && <PublishAd />}
      {(contentToShow == TabContent[TabContent.chat])
        && <Chats />
      }
    </HomeContainer>
  );
};

export default Home;