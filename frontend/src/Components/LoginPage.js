import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./CSS/LoginC.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const { tokenhandler } = props;
  const emailregex = /^[\w%\+\-]+(\.[\w%\+\-]+)*@[\w%\+\-]+(\.[\w%\+\-]+)+$/;

  const [token, setToken] = useState();
  const Navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [tempState, setTempState] = useState(false);
  const [tempState1, setTempState1] = useState(false);

  const onBlurHandlerEmail = () => {
    if (userData.email) {
      setTempState(false);
    } else {
      setTempState(true);
    }
  };

  const onBlurHandlerPass = () => {
    if (userData.password) {
      setTempState1(false);
    } else {
      setTempState1(true);
    }
  };
  const onchangeHandler = (e) => {
    if (e.target.name === "email") {
      setTempState(false);
    } else if (e.target.name === "password") {
      setTempState1(false);
    }

    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const confirm = () => {
    // settoggle(true);
    axios
      .post("http://localhost:8080/login", userData)
      .then((res) => {
        console.log(res);
        tokenhandler(res.data);
        localStorage.setItem("Token", res.data.token);
        localStorage.setItem("id", res.data.user);
        Navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <Grid>
      <Box
        height="100vh"
        // backgroundColor="#AFE1AF"
        margin="0"
        // padding="auto"
        display="flex"
        justifyContent="center"
      >
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            //   margin: "auto",
            alignItems: "center",
            // padding: "auto",
            "& > :not(style)": { m: "auto" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              margin: "0",
              width: "70%",
              borderBottom: "10px solid #097969",
              padding: "40px",
              justifyContent: "center",
            }}
            gutterBottom
            component="div"
          >
            Login Form
          </Typography>
          <Grid container rowSpacing={3} spacing={2}>
            <Grid item md={12}>
              {/* <label>Email</label> */}
              <TextField
                onBlur={onBlurHandlerEmail}
                error={tempState ? true : undefined}
                fullWidth
                value={userData.email}
                onChange={onchangeHandler}
                name="email"
                label="email"
                id="outlined-basic"
                placeholder="Enter Email"
                variant="outlined"
                helperText={tempState ? " Valid Email Required" : ""}
              />
            </Grid>
            <Grid item md={12}>
              {/* <label>Password</label> */}
              <TextField
                onBlur={onBlurHandlerPass}
                error={tempState1 ? true : undefined}
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={userData.password}
                onChange={onchangeHandler}
                id="outlined-basic"
                placeholder="Enter Password"
                variant="outlined"
                helperText={tempState1 ? "Password Required" : ""}
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
            <p>Sign up for AM SOCIAL FEED</p>
            <Link to="/sign-up">Click here</Link>
          </div>
          <label
            style={{
              display: "flex",
              justifyContent: "center",
              // marginTop: "10px",
              margin: "0",
            }}
            onClick={() => Navigate("/sign-up")}
          >
            Login with Google
          </label>
          <Button
            sx={{ bgcolor: "#097969", padding: "20px", minWidth: "30%" }}
            variant="contained"
            onClick={confirm}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default LoginPage;
