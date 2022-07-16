import React, { useEffect, useState } from "react";
import { TextField,Box} from "@mui/material";
import io from "socket.io-client";
import { Container } from "@mui/system";
import "../App.css";

 const socket = io.connect("http://192.168.1.125:5000");
export const ChatPage = ({  username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  
  // socket.on("receive_message", (data) => {
  //   setMessageList((list) => [...list, data]);
  // })

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      };

      await socket.emit("receive_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  socket.on("receive_message", (data) => { //reciever
    setMessageList((list) => [...list, data]);
    console.log("hi")
  });
  
  useEffect(() => {
    socket.emit("send_message", (data) => { //sender
      setMessageList((list) => [...list, data]);
      console.log("hi")
    });
  }, [socket]);

 

  // socket.on("send", (msg) => {
  //   setChat([...chat, msg]);
  //   // console.log(msg);
  // });

//   useEffect(() => {
//     socket.on("message", (msg) => {
//       setChat([...chat, msg]);
//     });
//   }, [chat]);

//   const onSubmitMessage = (e) => {
//     e.preventDefault();
//     socket.emit("join_room", msg);
//     console.log(msg);
//     setChat([...chat, msg]);
//  };


 
return (
<div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <div className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-footer">
      <TextField
          label="message"
          name="currentMessage"
          value={currentMessage}
          size="small"
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        
        />
        <button type="submit" onClick={sendMessage}>send</button>
      </div>
    </div>
  );
}