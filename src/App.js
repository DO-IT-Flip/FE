import React, { useState } from "react";
import "./App.css";
import LoginModal from "./container/modal/Main/loginModal";
import RegisterModal from "./container/modal/Main/registerModal";
import LocationModal from "./container/modal/Mini/locationModal";
import ParticipantModal from "./container/modal/Mini/participantModal";

function App() {
  // 상태 선언
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showParticipantModal, setShowParticipantModal] = useState(true);

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
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onSubmit={(data) => console.log("로그인 시도:", data)}
        />
      )}

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          onSubmit={(data) => console.log("회원가입 시도:", data)}
        />
      )}
      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onSubmit={(location) => console.log("위치 추가됨:", location)}
        />
      )}
      {showParticipantModal && (
        <ParticipantModal
          onClose={() => setShowParticipantModal(false)}
          onSubmit={(name) => console.log("참여자 추가됨:", name)}
        />
      )}
    </div>
  );
}

export default App;
