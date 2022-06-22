import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import io from "socket.io-client";
const socket = io.connect("http://192.168.1.125:5000");
export const ChatPage = () => {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  socket.on("send", (msg) => {
    setChat([...chat, msg]);
    // console.log(msg);
  });

  useEffect(() => {
    socket.on("message", (msg) => {
      setChat([...chat, msg]);
    });
  }, [chat]);

  const onSubmitMessage = (e) => {
    e.preventDefault();
    socket.emit("message", msg);
    console.log(msg);
    setChat([...chat, msg]);
  };
  return (
    <div>
      <h1>Chat log</h1>
      {chat.map((msg, index) => {
        return <p key={index}>{msg}</p>;
      })}

      <form onSubmit={onSubmitMessage}>
        <TextField
          label="message"
          name="msg"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <br />
        <br />
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};
