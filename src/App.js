import React from "react";
import { BrowserRouter } from "react-router-dom";
import SideBar from "@components/Layout/SideBar";
import BottomSearchBar from "@src/components/Layout/BottomSearchBar";

function App() {
  return (
    <BrowserRouter>
      <div
        
      >
        <SideBar />
        <BottomSearchBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
