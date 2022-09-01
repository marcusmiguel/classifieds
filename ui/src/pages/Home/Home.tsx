import React, { useEffect, useState } from "react";
import { renderMatches } from "react-router-dom";
import { Chat } from "../../components/Chat/Chat";
import { Details } from "../../components/Details/Details";
import { Form } from "../../components/Form/Form";
import { List } from "../../components/List/List";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useAppSelector } from "../../redux/hooks/hooks";
import { TabContent } from "../../types";
import { HomeContainer } from "./style";

const Home = () => {

  const { ads, myads } = useAppSelector((state) => state.advertisements.advertisements);
  const [contentToShow, setContentToShow] = useState(TabContent[TabContent.theirAds]);

  return (
    <HomeContainer>
      <Sidebar setContentFunc={setContentToShow} />
      {(contentToShow == TabContent[TabContent.theirAds])
        && <List ads={ads} contentToShow={contentToShow} />
      }
      {(contentToShow == TabContent[TabContent.myads])
        && <List ads={myads} contentToShow={contentToShow} />
      }
      {(contentToShow == TabContent[TabContent.publishAd])
        && <Form />}
      {(contentToShow == TabContent[TabContent.chat])
        && <Chat />
      }
    </HomeContainer>
  );
};

export default Home;