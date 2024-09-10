import React from 'react';
import AllAdvPage from './pages/AllAdvPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingleAdvPage from './pages/SingleAdvPage';
import OrdersPage from './pages/OrdersPage';

const App: React.FC = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllAdvPage />} />
          <Route path="/ad/:id" element={<SingleAdvPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </BrowserRouter>
      ;
    </main>
  );
};

export default App;
