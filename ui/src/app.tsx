import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
// import { Charges, ChargeUpdateInitial, scryCharges } from '@urbit/api';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {
  const [formValues, setFormValues] = useState({ title: '', desc: '' });

  const handleButtonClick = () => {
    api.poke(
      {
        app: 'classifieds',
        mark: 'classifieds-action',
        json: { 'pub-advertisement': { 'title': formValues.title, 'desc': formValues.desc } },
      }
    );
    setFormValues({ title: '', desc: '' });
  };

  const handleChange = (e) => {
    const { placeholder, value } = e.target;
    setFormValues({ ...formValues, [placeholder]: value });
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="max-w-md space-y-6 py-20">
        <h1 className="text-3xl font-bold">Welcome to classifieds</h1>
        <input
          placeholder="title"
          onChange={handleChange}
          type="text"
          value={formValues.title}
        />
        <input
          placeholder="desc"
          onChange={handleChange}
          type="text"
          value={formValues.desc}
        />
        <button onClick={handleButtonClick}>Poke agent!</button>
      </div>
    </main>
  );
}
