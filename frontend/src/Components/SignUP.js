import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/SignUp.css";
// import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />; //returns something
});

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
  const [open, setOpen] = React.useState(false);
  const [toasterClr, setToasterClr] = useState("");
  const [toasterMsg, setToasterMsg] = useState("");
  // const fblur = (e) => {
  //   console.log(e.target.name);
  //   if (e.target.name === "firstname") {
  //     userData.firstname ? setTempState(false) : setTempState(true);
  //   } else if (e.target.name === "lastname") {
  //     userData.lastname ? setTempState1(false) : setTempState1(true);
  //   } else if (e.target.name === "email") {
  //     userData.email ? setTempState2(false) : setTempState2(true);
  //   } else if (e.target.name === "password") {
  //     userData.password ? setTempState3(false) : setTempState3(true);
  //   }
  // };

  const onChangeHandler = (e) => {
    if (e.target.name === "firstname") {
      setTempState(false);
    } else if (e.target.name === "lastname") {
      setTempState1(false);
    } else if (e.target.name === "email") {
      setTempState2(false);
    } else if (e.target.name === "password") {
      setTempState3(false);
    }
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  console.log(userData);

  const onBlurHandler = () => {
    if (userData.firstname) {
      setTempState(false);
    } else {
      setTempState(true);
    }
  };

  const onBlurHandler1 = () => {
    if (userData.lastname) {
      setTempState1(false);
    } else {
      setTempState1(true);
    }
  };

  const onBlurHandler2 = () => {
    if (userData.email && emailregex.test(userData.email)) {
      setTempState2(false);
    } else {
      setTempState2(true);
    }
  };

  const onBlurHandler3 = () => {
    if (userData.password && passwordregex.test(userData.password)) {
      setTempState3(false);
    } else {
      setTempState3(true);
    }
  };

  // SNACKBAR..
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const Confirm = () => {
    settoggle(true);

    if (
      userData.firstname &&
      userData.lastname &&
      userData.email &&
      userData.password
    ) {
      axios
        .post("http://localhost:8080/users/SignUp", userData)
        .then((res) => {
          console.log(res);
          setOpen(true);
          setToasterMsg("Sign-Up Successful...");
          setToasterClr("success");
          console.log(res);
          if (res.data === "Email already exists") {
            setOpen(true);
            setToasterMsg("Email already exists");
            setToasterClr("error");
          } else {
            Navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          setOpen(true);
          setToasterMsg("Sign-Up Not Successful Try Again...");
          setToasterClr("error");
        });
    } else {
      setOpen(true);
      setToasterMsg("Enter valid Fieldsss....");
      setToasterClr("success");
    }
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
          width: "50%",
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
              onBlur={onBlurHandler}
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
              onBlur={onBlurHandler1}
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
              onBlur={onBlurHandler2}
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
              onBlur={onBlurHandler3}
              name="password"
              type="password"
              value={userData.password}
              onChange={onChangeHandler}
              error={tempState3 ? true : undefined}
              helperText={tempState3 ? "Enter valid Password" : ""}
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
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          width="100px"
        >
          <Alert
            onClose={handleClose}
            severity={toasterClr}
            sx={{ width: "100%" }}
          >
            {toasterMsg}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default SignUP;
