import React from "react";
import { BrowserRouter } from "react-router-dom";
import SideBar from "@components/Layout/SideBar";
import BottomSearchBar from "@src/components/Layout/BottomSearchBar";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <SideBar />
        <BottomSearchBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
