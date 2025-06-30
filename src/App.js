import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@components/Layout/MainLayout";
import Flip from "@src/pages/Flip";
import StanBy from "@src/pages/Stanby";
import "@styles/globals.css";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<StanBy/>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
export default App;
