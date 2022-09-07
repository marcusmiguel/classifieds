import React, { useEffect, useState } from "react";
import { Chat } from "../../components/Chat/Chat";
import { Form } from "../../components/Form/Form";
import { List } from "../../components/List/List";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { useAppSelector } from "../../redux/hooks/hooks";
import { Advertisement, TabContent } from "../../types";
import { HomeContainer } from "./style";

const Home = () => {
  const { ads, myads } = useAppSelector((state) => state.advertisements.advertisements);
  const [contentToShow, setContentToShow] = useState(TabContent[TabContent.ads]);

  return (
    <HomeContainer>
      <Sidebar setContentFunc={setContentToShow} />
      {
        (contentToShow == TabContent[TabContent.ads])
        && <List ads={ads} contentToShow={contentToShow} />
      }
      {(contentToShow == TabContent[TabContent.myads])
        && <List ads={myads} contentToShow={contentToShow} />
      }
      {(contentToShow == TabContent[TabContent.newAd])
        && <Form />}
      {(contentToShow == TabContent[TabContent.chat])
        && <Chat />
      }
    </HomeContainer>
  );
};

export default Home;