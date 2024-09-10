import React from 'react';
import AllAdvPage from './pages/AllAdvPage/AllAdvPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingleAdvPage from './pages/SingleAdvPage';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import './App.css';
import Header from './components/Header/Header';

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
