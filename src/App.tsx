import React from 'react';
import AllAdvPage from './pages/AllAdvPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingleAdvPage from './pages/SingleAdvPage';

const App: React.FC = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllAdvPage />} />
          <Route path="/ad/:id" element={<SingleAdvPage />} />
        </Routes>
      </BrowserRouter>
      ;
    </main>
  );
};

export default App;
