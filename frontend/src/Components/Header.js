import * as React from "react";
import "./CSS/AddPostc.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Avatar, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { CloudDone } from "@mui/icons-material";
// import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
// import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderTop: "40px solid #097969",
  // border: "2px solid #000",

  boxShadow: 24,
  p: 4,
};
const Header = (props) => {
  const { counter1 } = props;
  const Token = localStorage.getItem("Token");
  const id = localStorage.getItem("id");
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [toggle, settoggle] = React.useState(false);
  const [userData, setUserData] = React.useState({
    image: "",
    name: "",
  });
  const [toasterClr, setToasterClr] = React.useState("");
  const [toasterMsg, setToasterMsg] = React.useState("");
  //to get user image

  React.useEffect(() => {
    axios
      .get(`http://localhost:8080/users/user/${id}`, {
        headers: {
          authorization: Token,
        },
      })
      .then((res) => {
        console.log(res);
        setUserData({ image: res.data.image, name: res.data.firstname });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [counter1]);
  // console.log(userData);
  // const [tempState, setTempState] = React.useState(true);

  const handleMenu = (event) => {
    console.log(event);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Modal

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpenM = () => setOpen(true);
  const handleCloseM = () => setOpen(false);

  const [currentPass, setcurrentPass] = React.useState({
    userID: id,
    currentPassword: "",
    newPassword: "",
  });

  const [password, setPassword] = React.useState({
    confirm1: "",
    confirm2: "",
  });
  // console.log(currentPass);
  // console.log(password);

  const confirmedFun = (e) => {
    setPassword({
      ...password,
      confirm2: e.target.value,
    });
    if (e.target.value === password.confirm1) {
      setcurrentPass({ ...currentPass, newPassword: e.target.value });
    }
  };

  const save = () => {
    console.log(currentPass);
    if (currentPass.newPassword) {
      axios
        .put(`http://localhost:8080/users/changePassword/${id}`, currentPass, {
          headers: {
            authorization: Token,
          },
        })
        .then((res) => {
          console.log(res);
          setOpen(false);
          setOpen1(true);
          setToasterMsg("Successfully Password Updated...");
          setToasterClr("success");
        })
        .catch((err) => {
          console.log(err);
          // alert("current  password is wrong");
          setcurrentPass((pre) => ({ ...pre, currentPassword: "" }));
          setPassword({ confirm1: "", confirm2: "" });
          setOpen1(true);
          setToasterMsg("Password Not Updated...");
          setToasterClr("error");
        });
    } else {
      setPassword({ confirm1: "", confirm2: "" });
      // alert("Enter Correct Password Fieldsss///");
      setToasterMsg("Enter Correct Password Fieldsss///");
      setToasterClr("error");
    }
  };

  const Logout = () => {
    localStorage.clear();
    handleClose();
    Navigate("/login");
  };
  // console.log(currentPass);

  //toaster
  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen1(false);
  };

  //ONBLUR
  const [blurState, setBlurState] = React.useState(false);
  const [blurState1, setBlurState1] = React.useState(false);
  const [blurState2, setBlurState2] = React.useState(false);
  const passwordregex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const onBlur = () => {
    if (
      currentPass.currentPassword &&
      passwordregex.test(currentPass.currentPassword)
    ) {
      setBlurState(false);
    } else {
      setBlurState(true);
    }
  };

  const onBlur1 = () => {
    if (password.confirm1 && passwordregex.test(password.confirm1)) {
      setBlurState1(false);
    } else {
      setBlurState1(true);
    }
  };

  const onBlur2 = () => {
    if (
      password.confirm2 &&
      passwordregex.test(password.confirm2) &&
      password.confirm1 === password.confirm2
    ) {
      setBlurState2(false);
    } else {
      setBlurState2(true);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Modal
        open={open}
        onClose={handleCloseM}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Password
          </Typography> */}
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Current Password
              </Typography>
              <TextField
                value={currentPass.currentPassword}
                type="password"
                onBlur={onBlur}
                error={blurState ? true : false}
                helperText={blurState ? "Enter Correct Password ..." : ""}
                onChange={(e) => {
                  setcurrentPass({
                    ...currentPass,
                    currentPassword: e.target.value,
                  });
                }}
              ></TextField>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Change Password
              </Typography>
              <TextField
                value={password.confirm1}
                type="password"
                onBlur={onBlur1}
                error={blurState1 ? true : undefined}
                onChange={(e) => {
                  setPassword({
                    ...password,
                    confirm1: e.target.value,
                  });
                }}
                helperText={blurState1 ? "password not too strong ..." : ""}
              ></TextField>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Confirmed Password
              </Typography>
              <TextField
                type="password"
                onBlur={onBlur2}
                value={password.confirm2}
                onChange={confirmedFun}
                error={blurState2 ? true : undefined}
                helperText={
                  blurState2 ? "password not matching with eachother ..." : ""
                }
              ></TextField>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Button onClick={save} onClose={handleCloseM} variant="contained">
                Save
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <Snackbar open={open1} autoHideDuration={4000} onClose={handleCloseToast}>
        <Alert
          onClose={handleCloseToast}
          severity={toasterClr}
          sx={{ width: "100%" }}
        >
          {toasterMsg}
        </Alert>
      </Snackbar>

      <AppBar sx={{ bgcolor: "#097969" }} position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
            }}
          >
            AM SOCIAL FEED
          </Typography>
          {/* {auth && ( */}
          <div>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  // height: "250px",
                  // width: "250px",
                  // margin: "30px  auto",
                  bgcolor: "#D0F9D0",
                  // fontSize: "100px",
                  color: "black",
                  // border: "15px solid #AFE1AF",
                  // 097969
                  marginRight: "10px",
                }}
                onClick={handleMenu}
                alt="avatar"
                src={`http://localhost:8080/${userData.image}`}
              // className={classes.avatar}
              >
                {userData.name?.charAt(0)}
              </Avatar>

              {userData.name}
            </Box>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => (handleClose, Navigate("/edit-profile"))}
              >
                Edit Profile
              </MenuItem>
              <MenuItem onClick={(handleClose, handleOpenM)}>
                Change Password
              </MenuItem>
              <MenuItem onClick={Logout}>Logout</MenuItem>
            </Menu>
          </div>
          {/* )} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
