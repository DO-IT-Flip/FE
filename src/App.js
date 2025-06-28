import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@components/Layout/MainLayout";
import Waiting from "@pages/Waiting";
import '@styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Waiting />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
export default App;
