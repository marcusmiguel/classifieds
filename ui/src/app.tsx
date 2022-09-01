import React, { useEffect } from 'react';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
// import { Charges, ChargeUpdateInitial, scryCharges } from '@urbit/api';
import { Home } from './pages/'
import { useAppDispatch, useAppSelector } from './redux/hooks/hooks';
import { loadAds } from './redux/slices/advertisementsSlice';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAds());
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <BrowserRouter basename='/apps/classifieds'>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
