import React, { useState, useContext, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context";

export const User = () => {
  const [name, setName] = useState("");
  const [err, setErr] = useState(0);
  // const { setUserProfile } = useContext(UserContext);
  let history = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem("name"));
    setUserProfile({ name: localStorage.getItem("name") });
  }, []);

  const validate = () => {
    if (localStorage.getItem("name")) {
      console.log(localStorage.getItem("name"));
      setUserProfile({ name: localStorage.getItem("name") });
      alert("already exist user");
      history("/logout");
    } else {
      setErr(0);
      if (name === "") {
        setErr(1);
        alert("Please enter Name");
      } else {
        console.log(localStorage.getItem("users"));
        let users = JSON.parse(localStorage.getItem("users"));
        if (users) {
          users.data.push({ id: users.data.length, name: name });
        } else {
          users = { data: [{ id: 0, name: name }] };
        }
        localStorage.setItem("users", JSON.stringify(users));
        history("/room");
        console.log(name);
      }
    }
  };
  return (
    <div>
      {/* <form > */}
      <TextField
        labe="name"
        name="name"
        value={name}
        placeholder="Enter Name"
        error={(err === 1) & true}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <br />
      
      <Button variant="contained" onClick={validate}>
        Login
      </Button>
      {/* </form> */}
    </div>
  );
};
