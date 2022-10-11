import { match } from 'assert';
import React, { useEffect, useState } from 'react';
import { Router, Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import api from './api';
import { Chats } from './components/Chats/Chats';
import { Details } from './components/Details/Details';
import { List } from './components/List/List';
import { Menubar } from './components/Menubar/Menubar';
import { PublishAd } from './components/PublishAd/PublishAd';
import { UserInfo } from './components/UserInfo/UserInfo';
import { useAppDispatch, useAppSelector } from './redux/hooks/hooks';
import { loadState } from './redux/slices/classifiedsSlice';

export function App() {
  const dispatch = useAppDispatch();
  const { ads, myads } = useAppSelector((state) => state.classifieds.data);

  useEffect(() => {
    dispatch(loadState());
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
  }, []);

  return (
    <BrowserRouter basename='/apps/classifieds'>
      <Menubar />
      <UserInfo />
      <Routes >
        <Route path="/myads/:id" element={<Details />} />
        <Route path="/ads/:id" element={<Details />} />
        <Route path="*" element={<></>} />
      </Routes>
      <Routes >
        <Route path="/ads" >
          <Route path="*" index element={<List listAds={ads} />} />
          {/* <Route path="page/:page" element={<List listAds={ads} />} /> */}
        </Route>
        <Route path="/myads" >
          <Route path="*" index element={<List listAds={myads} />} />
          {/* <Route path="page/:page" element={<List listAds={myads} />} /> */}
        </Route>
        <Route path="/chat" element={<Chats />} />
        <Route path="/newad" element={<PublishAd />} />
        <Route path="*" element={<Navigate to="/ads" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
