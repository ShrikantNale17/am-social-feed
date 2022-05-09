import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import GoogleLogin from "react-google-login";
// import whatsAppBack from "./Images/whatsappBack.jpg";
import "./CSS/LoginC.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginPage = (props) => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const { tokenhandler } = props;
  const emailregex = /^[\w%\+\-]+(\.[\w%\+\-]+)*@[\w%\+\-]+(\.[\w%\+\-]+)+$/;

  // const [token, setToken] = useState();
  const Navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [tempState, setTempState] = useState(false);
  const [tempState1, setTempState1] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [toasterClr, setToasterClr] = useState("");
  const [toasterMsg, setToasterMsg] = useState("");
  const onBlurHandlerEmail = () => {
    if (userData.email && emailregex.test(userData.email)) {
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

  // SNACKBAR..
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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

        setOpen(true);
        setToasterMsg("Login Successful...");
        setToasterClr("success");
        setTimeout(() => Navigate("/"), 1000);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "Password is incorrect") {
          setOpen(true);
          setToasterMsg("Username or Password is incorrect");
          setToasterClr("error");
          // setUserData({ email: "", password: "" });
        } else {
          setOpen(true);
          setToasterMsg("Login Not Successful Try Again...");
          setToasterClr("error");
          setUserData({ email: "", password: "" });
        }
      });
  };

  const responseGoogle = (res) => {
    // console.log(res.Lu.Bv);
    axios
      .post("http://localhost:8080/login/google-login", { email: res.Lu.Bv })
      .then((res) => {
        console.log(res);
        if (res.data) {
          console.log(res);
          localStorage.setItem("Token", res.data.token);
          localStorage.setItem("id", res.data.user._id);
          // props.setToken(res.data.token);
          // props?.handleClick("Login Successful !");
          setOpen(true);
          setToasterMsg("Login Successful...");
          setToasterClr("success");

          setTimeout(() => Navigate("/"), 1000);
        } else {
          alert(res);
        }
      })
      .catch((err) => {
        console.log(err);
        setOpen(true);
        setToasterMsg("Login Not Successful Try Again...");
        setToasterClr("error");
        // setUserData({ email: "", password: "" });
      });
  };

  return (
    <Grid>
      <Box
        height="100vh"
        // backgroundColor="#AFE1AF"
        margin="0"
        // padding="auto"
        // sx={{ backgroundImage: `url(${whatsAppBack})` }}
        display="flex"
        justifyContent="center"
      >
        <Box
          sx={{
            // backgroundImage: `url(${whatsAppBack})`,
            // opacity: "0.2",
            // filter: "blur(8px)",
            // -webkit-filter: "blur(8px)",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            //   margin: "auto",
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
            <Grid item md={12} paddingRight={4}>
              {/* <label>Email</label> */}
              <TextField
                onBlur={onBlurHandlerEmail}
                error={tempState ? true : undefined}
                fullWidth
                value={userData.email}
                onChange={onchangeHandler}
                name="email"
                label="email"
                type="email"
                id="outlined-basic"
                placeholder="Enter Email"
                variant="outlined"
                helperText={tempState ? " Valid Email Required" : ""}
              />
            </Grid>
            <Grid item md={12} p={4}>
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
              margin: "0px", // gap: "3px",
            }}
          >
            <p>Sign up for AM SOCIAL FEED</p>
            <Link to="/sign-up">Click here</Link>
          </div>
          {/* <label
            style={{
              display: "flex",
              justifyContent: "center",
              // marginTop: "10px",
              margin: "0",
            }}
            onClick={() => Navigate("/sign-up")}
          >
            Login with Google
          </label> */}
          <GoogleLogin
            clientId="258096711456-f6igfuafn2n9c5s14ch12tos4vag8jmj.apps.googleusercontent.com"
            // clientId="1069481089822-bfacd3vd7f547gss8cn0o9b49v32l76q.apps.googleusercontent.com"

            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
          <Button
            sx={{ bgcolor: "#097969", padding: "20px", minWidth: "30%" }}
            variant="contained"
            onClick={confirm}
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
    </Grid>
  );
};

export default LoginPage;
