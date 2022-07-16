import React, { useState } from 'react';
import './App.css';
import {Login} from './components/login'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Dashboard} from './components/dashboard'
import { UserContext, SnackContext } from "./components/context";
import {Snackbar, Slide, Alert } from '@mui/material'
import { Add } from './components/add';
function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [snack, setSnack] = useState({
    message: "",
    color: "",
    open: false,
  });
    return (
      <div className="App">
        <Snackbar
          autoHideDuration={3000}
          open={snack.open}
          onClose={() => {
            setSnack((prevdata) => {
              return {
                ...prevdata,
                open: false,
              };
            });
          }}
          TransitionComponent={Slide}
        >
          <Alert
            variant="filled"
            onClose={() => {
              setSnack((prevdata) => {
                return {
                  ...prevdata,
                  open: false,
                };
              });
            }}
            severity={snack.type}
          >
            {snack.message}
          </Alert>
        </Snackbar>
        <UserContext.Provider value={{ userProfile, setUserProfile }}>
          <SnackContext.Provider value={{ snack, setSnack }}>
      <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/add" element={<Add />}/>
      </Routes>
      </Router>
      </SnackContext.Provider>
        </UserContext.Provider>
      </div>
    );
 
}

export default App;
