import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import VerifikasiBerkas from './pages/VerifikasiBerkas';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/verifikasi" element={<VerifikasiBerkas />} />
    </Routes>
  );
}

export default App;
