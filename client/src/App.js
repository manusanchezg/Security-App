import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import BossHome from "./components/BossHome";
import AuthenticationBtn from "./components/AuthenticationBtn"
import BossAddUser from "./components/BossAddUser";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthenticationBtn/>}/>
        <Route path="/bossHome" element={<BossHome/>}/>
        <Route path='/' element={<Landing/>}/>
        <Route path="/BossNewUser" element={<BossAddUser/>}/>
      </Routes>
    </>
  );
};

export default App;