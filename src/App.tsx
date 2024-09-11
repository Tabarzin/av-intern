import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import AllAdvPage from './pages/AllAdvPage/AllAdvPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import SingleAdvPage from './pages/SingleAdvPage';

import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <main className="main">
        <Header />

        <Routes>
          <Route path="/" element={<AllAdvPage />} />
          <Route path="/ad/:id" element={<SingleAdvPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
