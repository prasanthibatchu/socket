import { Box, Grid, TextField, Container, Button } from "@mui/material";
import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, SnackContext } from "./context";
export const Login = () => {

  const { setUserProfile } = useContext(UserContext);
  const { setSnack } = useContext(SnackContext);
 // React States
 const [errorMessages, setErrorMessages] = useState({});
 const [isSubmitted, setIsSubmitted] = useState(false);
let history=useNavigate()
 // User Login info
 const dbUsers = [
   {
     username: "admin1",
     password: "pass1"
   },
   {
     username: "admin2",
     password: "pass2"
   }
 ];

 const errors = {
  
   uname: "invalid username",
   pass: "invalid password"
 };

 const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = dbUsers.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        setSnack({ message: "user Login successfully", open: true });
        history('/dashboard')
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
      setSnack({ message: "user enter wrong credentials", type: "error", open: true });
  };
    }

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );
 // JSX code for login form
 const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
      <Container maxWidth="sm">
        <Box m={10} p={8} sx={{ backgroundColor: "aliceblue" }}>
          <h1>Signup Form</h1>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item>
        <TextField label="name" name="uname" required/>{renderErrorMessage("uname")}</Grid>
        <Grid item><TextField label="password" name="pass" required/>{renderErrorMessage("pass")}</Grid>
       
        <Grid item>
            <Button variant="contained" type="submit">submit</Button></Grid>
         
       
        </Grid>
        </Box>
        </Container>
      </form>
    </div>
  );
  return (
    <div>
      {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
    </div>
  );
};


