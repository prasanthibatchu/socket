import React, { useState, useEffect } from "react";
import "./App.css";
import { User } from "./components/user";
import { ChatPage } from "./components/chat";
import { Logout } from "./components/logout";
import { UserContext } from "./components/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  // const [userProfile, setUserProfile] = useState(null);
  // useEffect(() => {
  //   var localdata = localStorage.getItem("name");
  //   if (localdata != null) {
  //     setUserProfile({ name: localStorage.getItem("name") });
  //   }
  // }, []);
  return (
    <div className="App">
      <h1>Socket IO</h1> 
      {/* <UserContext.Provider value={{ userProfile, setUserProfile }}>
       */}
        <Router>
          

          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/chat" element={<ChatPage />} />
            
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      {/* </UserContext.Provider> */}
    </div>
  );
}

export default App;