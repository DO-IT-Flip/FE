import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "@components/Layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        {/* 여기에 페이지별 콘텐츠 */}
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
