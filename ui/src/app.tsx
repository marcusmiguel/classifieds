import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Chats } from './components/Chats/Chats';
import { ChatsConversation } from './components/Chats/ChatsConversation/ChatsConversation';
import { DeleteModal } from './components/Details/DeleteModal/DeleteModal';
import { Details } from './components/Details/Details';
import { DetailsConversation } from './components/Details/DetailsConversation/DetailsConversation';
import { EditModal } from './components/Details/EditModal/EditModal';
import { List } from './components/List/List';
import { Menubar } from './components/Menubar/Menubar';
import { PublishAd } from './components/PublishAd/PublishAd';
import { UserInfo } from './components/UserInfo/UserInfo';
import { useAppDispatch, useAppSelector } from './redux/hooks/hooks';
import { loadState } from './redux/slices/classifiedsSlice';

export function App() {
  const { ads, myads } = useAppSelector((state) => state.classifieds.data);
  const dispatch = useAppDispatch();

  // TODO: unsubscribe on unmount
  useEffect(() => {
    dispatch(loadState());
  }, []);

  return (
    <BrowserRouter basename='/apps/classifieds'>
      <Menubar />
      <UserInfo />
      <Routes >
        <Route path="/ads/*" element={<List listAds={ads} />} />
        <Route path="/myads/*" element={<List listAds={myads} />} />
        <Route path="/chat" element={<Chats />}>
          <Route path=":id" element={<ChatsConversation />} />
        </Route>
        <Route path="/newad" element={<PublishAd />} />
        <Route path="*" element={<Navigate to="/ads" replace />} />
      </Routes>
      <Routes >
        <Route path="ads/:id" element={<Details />}>
          <Route path="chat" element={<DetailsConversation />} />
        </Route>
        <Route path="myads/:id" element={<Details />}>
          <Route path="delete" element={<DeleteModal />} />
          <Route path="edit" element={<EditModal />} />
        </Route>
        <Route path="*" element={<></>} />
      </Routes>


    </BrowserRouter>
  );
}
