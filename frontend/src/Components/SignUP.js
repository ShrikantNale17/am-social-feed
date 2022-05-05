import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/SignUp.css";
const SignUP = () => {
  const emailregex = /^[\w%\+\-]+(\.[\w%\+\-]+)*@[\w%\+\-]+(\.[\w%\+\-]+)+$/;
  const passwordregex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const Navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [tempState, setTempState] = useState(false);
  const [tempState1, setTempState1] = useState(false);
  const [tempState2, setTempState2] = useState(false);
  const [tempState3, setTempState3] = useState(false);
  const [toggle, settoggle] = useState(false);

  const fblur = (e) => {
    console.log(e.target.name);
    if (e.target.name === "firstname") {
      userData.firstname ? setTempState(false) : setTempState(true);
    } else if (e.target.name === "lastname") {
      userData.lastname ? setTempState1(false) : setTempState1(true);
    } else if (e.target.name === "email") {
      userData.email ? setTempState2(false) : setTempState2(true);
    } else if (e.target.name === "password") {
      userData.password ? setTempState3(false) : setTempState3(true);
    }
  };

  const onChangeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    if (e.target.name === "firstname") {
      userData.firstname ? setTempState(false) : setTempState(true);
    } else if (e.target.name === "lastname") {
      userData.lastname ? setTempState1(false) : setTempState1(true);
    } else if (e.target.name === "email") {
      userData.email ? setTempState2(false) : setTempState2(true);
    } else if (e.target.name === "password") {
      userData.password ? setTempState3(false) : setTempState3(true);
    }
  };
  console.log(userData);

  const Confirm = () => {
    settoggle(true);
    axios
      .post("http://localhost:8080/users/SignUp", userData)
      .then((res) => {
        console.log(res);
        Navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      // bgcolor="#AFE1AF"
      height="100vh"
      //   margin="auto"
      // margin="100px"
      padding="auto"
      display="flex"
      justifyContent="center"
    >
      <Box
        sx={{
          width: "80%",
          //   margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "auto",
          "& > :not(style)": { m: "auto" },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "70%",
            borderBottom: "10px solid #097969",
            padding: "40px",
          }}
          gutterBottom
          component="div"
        >
          Sign Up Form
        </Typography>
        <Grid container rowSpacing={3} spacing={1}>
          <Grid item md={6}>
            {/* <label>First Name</label> */}
            <TextField
              value={userData.firstname}
              onBlur={fblur}
              name="firstname"
              error={tempState ? true : undefined}
              onChange={onChangeHandler}
              helperText={tempState ? "Required" : ""}
              fullWidth
              id="outlined-basic"
              placeholder="Enter First Name"
              variant="outlined"
            />
          </Grid>
          <Grid item md={6}>
            {/* <label>Last Name</label> */}
            <TextField
              value={userData.lastname}
              onBlur={fblur}
              name="lastname"
              error={tempState1 ? true : undefined}
              onChange={onChangeHandler}
              helperText={tempState1 ? "Required" : ""}
              fullWidth
              id="outlined-basic"
              placeholder="Enter Last Name"
              variant="outlined"
            />
          </Grid>
          <Grid item md={12}>
            {/* <label>Email</label> */}
            <TextField
              value={userData.email}
              onBlur={fblur}
              name="email"
              error={tempState2 ? true : undefined}
              helperText={tempState2 ? "Enter valid Email id" : ""}
              onChange={onChangeHandler}
              fullWidth
              id="outlined-basic"
              placeholder="Enter Email"
              variant="outlined"
            />
          </Grid>
          <Grid item md={12}>
            {/* <label>Password</label> */}
            <TextField
              fullWidth
              onBlur={fblur}
              name="password"
              type="password"
              error={
                toggle
                  ? !passwordregex.test(userData.password)
                    ? true
                    : undefined
                  : undefined
              }
              value={userData.password}
              onChange={onChangeHandler}
              helperText={
                tempState3
                  ? !passwordregex.test(userData.password)
                    ? "password not strong..."
                    : ""
                  : ""
              }
              id="outlined-basic"
              placeholder="Enter Password"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <p>Already Have An Account...</p>
          <Link to="/login">Click here</Link>
        </div>
        <Button
          variant="contained"
          onClick={Confirm}
          sx={{ bgcolor: "#097969" }}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default SignUP;
