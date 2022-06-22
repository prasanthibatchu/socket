import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import io from "socket.io-client";
import {useNavigate} from 'react-router-dom'
const socket = io.connect("http://192.168.1.125:5000");
export const Room = () => {
  const [room, setRoom] = useState("");
  const [err,setErr]=useState(0)
let history=useNavigate()
  socket.on("join_room_announcement", (room) => {
    setChat([...chat, room]);
    // console.log(msg);
  });

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("users")));
    socket.on("join_room", (room) => {
        setRoom([...room, room]);
    });
  }, []);
  
  const validate=(e)=>{
    setErr(0)
    if (room === "") {
      setErr(1)
      alert("Please enter room number")
    }
    else{
      history('/chat')
      
    }
    e.preventDefault();
    socket.emit("join_room", room);
    console.log(room);
  }

//   const onSubmitMessage = (e) => {
//     e.preventDefault();
//     socket.emit("join_room", room);
//     console.log(room);
//     // setChat([... chat,msg])
//   };

  return (
    <div>
      <h1>Room</h1>
     

      <form onSubmit={validate}>
        <TextField
          label="room id"
          name="room"
          type='number'
          value={room}
          error={err===1 & true}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <br />
        <br />
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};
