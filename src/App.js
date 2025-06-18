import React from "react";
import "./App.css";
import LoginModal from "./container/modal/main/login/loginModal";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginModal
        onClose={() => console.log("닫기")}
        onSwitchToRegister={() => console.log("회원가입 전환")}
        onSubmit={(data) => console.log("로그인 시도:", data)}
      />
    </div>
  );
}

export default App;
