import React, { useState,useEffect,useContext } from 'react'
import {Container,Box,Grid,TextField,Button} from '@mui/material'
import {SnackContext } from "./context";
import io from "socket.io-client";
const socket = io.connect("http://192.168.1.51:5000");
export const Add=()=>{
    const [name, setname] = useState("");
    const { setSnack } = useContext(SnackContext);
    const [msg, setMsg] = useState([]);
    // socket.on("send", (name) => {
    //     setMsg([...msg, name]);
    //     console.log(name);
    //   });
    
      useEffect(() => {
        socket.on("send", (name) => {
            setMsg([...msg, name]);
            // console.log(name)
        });
      }, [msg]);
      const onSubmitMessage = (e) => {
        e.preventDefault();
        socket.emit("message", name);
        console.log(name);
        setMsg([...msg, name]);
        setSnack({ message: "user added successfully", open: true });
      };
  return (
    <div>
       {/* {msg.map((name, index) => {
        return <p key={index}>{name}</p>;
      })} */}
         <Container maxWidth="sm">
        <Box m={10} p={8} sx={{ backgroundColor: "aliceblue" }}>
          <h1>Add user</h1>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item>
        <TextField label="name" name="name" value={name}   onChange={(e) => {
            setname(e.target.value);
          }} /></Grid>
        <Grid item>
        <Button variant='contained' onClick={onSubmitMessage}>submit</Button>
        </Grid>
        </Grid>
        </Box>
        </Container>
    </div>
  )
}
