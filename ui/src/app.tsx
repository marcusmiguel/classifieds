import React, { useEffect } from 'react';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import api from './api';
import { Home } from './pages/'
import { useAppDispatch, useAppSelector } from './redux/hooks/hooks';
import { loadState } from './redux/slices/classifiedsSlice';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(api.ship)
    dispatch(loadState());
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";

  }, []);

  return (
    <BrowserRouter basename='/apps/classifieds'>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
