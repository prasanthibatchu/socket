import React, { useState, useContext, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context";
import "../App.css";

import io from "socket.io-client";
const socket = io.connect("http://192.168.1.125:5000");
export const User = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [err, setErr] = useState(0);
  // const { setUserProfile } = useContext(UserContext);
  let history = useNavigate();


  // useEffect(() => {
  //   console.log(localStorage.getItem("name"));
  //   setUserProfile({ name: localStorage.getItem("name") });
  // }, []);

  const validate = () => {
    // if (localStorage.getItem("name")) {
    //   console.log(localStorage.getItem("name"));
    //   setUserProfile({ name: localStorage.getItem("name") });
    //   alert("already exist user");
    //   history("/logout");
    // } else {
      setErr(0);
      if (name === "") {
        setErr(1);
        alert("Please enter Name");
      } 
      else if (room === "") {
        setErr(2)
        alert("Please enter room number")
      }else {
        // console.log(localStorage.getItem("users"));
        // let users = JSON.parse(localStorage.getItem("users"));
        // if (users) {
        //   users.data.push({ id: users.data.length, name: name });
        // } else {
        //   users = { data: [{ id: 0, name: name }] };
        // }
        // localStorage.setItem("users", JSON.stringify(users));
        history("/chat");
        console.log(name);
      } socket.emit("join_room", room);
       console.log(room);
    // };
    }
   
   


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
      <TextField
          label="room id"
          name="room"
          type='number'
          value={room}
          error={err===1 & true}
          onChange={(e) => {
            setRoom(e.target.value);
          }}/>
          <br />
      <br />
      <Button variant="contained" onClick={validate}>
        Login
      </Button>
      {/* </form> */}
    </div>
  );
}