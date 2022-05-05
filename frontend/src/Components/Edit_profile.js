import { Avatar, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import whatsAppBack from "./Images/whatsappBack.jpg";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Header from "./Header";
import FormLabel from "@mui/material/FormLabel";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import { upload } from "@testing-library/user-event/dist/upload";

const Edit_profile = ({ source, record = {} }) => {
  const Token = localStorage.getItem("Token");
  const id = localStorage.getItem("id");
  console.log(Token, "hey");
  const [image, setImage] = useState(true);
  const emailregex = /^[\w%\+\-]+(\.[\w%\+\-]+)*@[\w%\+\-]+(\.[\w%\+\-]+)+$/;
  const Navigate = useNavigate();
  var tempImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  const [userD, setUserD] = useState();
  const formData = new FormData();
  const [tempState, setTempState] = useState(false);
  const [tempState1, setTempState1] = useState(false);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: 0,
    DOB: "",
    bio: "",
    gender: "",
  });
  const [oldProfilePic, setOldProfilePic] = useState();
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadImg, setuploadImg] = useState({
    image: "",
    userID: id,
  });
  console.log(uploadImg);
  useEffect(() => {
    if (uploadImg.image) {
      setImageUrl(URL.createObjectURL(uploadImg.image));
    }
  }, [uploadImg.image]);

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      Navigate("/login");
    }
    axios
      .get(`http://localhost:8080/users/user/${id}`, {
        headers: {
          authorization: Token,
        },
      })
      .then((res) => {
        setUserD(res.data);
        setUserData({
          ...userData,
          firstname: res.data.firstname,
          email: res.data.email,
          lastname: res.data.lastname,
          bio: res.data.bio,
          gender: res.data.gender,
          DOB: res.data.DOB,
          mobile: res.data.mobile,
        });
        setOldProfilePic(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(userD);
  console.log(oldProfilePic);

  const onChangeHandler = (e) => {
    setUserData({ ...userData, firstname: e.target.value });
  };

  const onChangeHandler1 = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const onChangeHandler3 = (e) => {
    setUserData({ ...userData, [e.target.name]: +e.target.value });
  };

  const onBlurFun = (e) => {
    if (e.target.name === "firstname") {
      !userData.name ? setTempState(true) : setTempState(false);
    }

    if (e.target.name === "email") {
      emailregex.test(userData.email)
        ? setTempState1(false)
        : setTempState1(true);
    }
  };
  const save = () => {
    //localhost:8080/users/edit-profile/userDetails/:id
    console.log(userData);
    axios
      .put(
        `http://localhost:8080/users/edit-profile/userDetails/${id}`,
        userData,
        {
          headers: {
            authorization: Token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert(res.message);
        Navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //to get image

  //upload image
  const upLoadImage = () => {
    console.log(uploadImg);
    formData.append("userID", uploadImg.userID);
    formData.append("image", uploadImg.image);
    axios
      .put(
        `http://localhost:8080/users/edit-profile/addProfile-Pic/${id}`,
        formData,
        {
          headers: {
            authorization: Token,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const removeImage = () => {
    axios
      .put(
        `http://localhost:8080/users/edit-profile/removeProfile-Pic/${id}`,
        id,
        {
          headers: {
            authorization: Token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setImage(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      style={{
        height: "100vh",
        backgroundImage: `url(${whatsAppBack})`,
        borderTop: "10px solid #AFE1AF",
        borderLeft: "20px solid #AFE1AF",
        borderRight: "20px solid #AFE1AF",
      }}
    >
      <Header />

      <Grid container m={4}>
        <Grid minHeight="60%" item md={3}>
          <Box>
            <label>Edit Profile Picture ...</label>
            {image ? (
              <Box>
                <Avatar
                  sx={{
                    height: "250px",
                    width: "250px",
                    margin: "30px  auto",
                    bgcolor: "#D0F9D0",
                    fontSize: "100px",
                    color: "black",
                    // border: "15px solid #AFE1AF",
                    // 097969
                  }}
                  alt="avatar"
                  src={`http://localhost:8080/${oldProfilePic}`}
                  // className={classes.avatar}
                >
                  {userData.firstname.charAt(0)}
                </Avatar>
              </Box>
            ) : (
              imageUrl &&
              uploadImg.image && (
                <Box mt={2} textAlign="center">
                  <img
                    style={{ maxWidth: "100%", height: "auto" }}
                    src={imageUrl}
                    alt={uploadImg.image.name}
                    height="100px"
                  />
                  {upLoadImage()}
                </Box>
              )
            )}
            <Stack spacing={2} direction="row" m={4}>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                onChange={(e) =>
                  setuploadImg({ ...uploadImg, image: e.target.files[0] })
                }
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  onClick={() => setImage(false)}
                >
                  Upload ImageS
                </Button>
              </label>

              {/* <Button variant="text" onClick={upLoadImage}>
                upload Image
              </Button> */}
              <Button variant="contained" onClick={removeImage}>
                Remove Image
              </Button>
            </Stack>
          </Box>
          {/* //edit image */}
        </Grid>
        <Grid item md={9}>
          <Grid container width="100%" m={4} rowSpacing={5} spacing={3}>
            <Grid item md={5}>
              <FormControl fullWidth error variant="standard">
                {/* <label>Name</label> */}
                <TextField
                  fullWidth
                  name="userName"
                  value={userData.firstname}
                  onChange={onChangeHandler}
                  onBlur={onBlurFun}
                  label="Name"
                  error={tempState ? true : undefined}
                  helperText={tempState ? "Enter Name" : ""}
                  sx={{ bgcolor: "white" }}
                  id="outlined-basic"
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item md={5}>
              <FormControl fullWidth error variant="standard">
                {/* <label>Email</label> */}
                <TextField
                  name="email"
                  value={userData.email}
                  onChange={onChangeHandler1}
                  sx={{ bgcolor: "white" }}
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  label="Email"
                  onBlur={onBlurFun}
                  error={tempState1 ? true : undefined}
                  helperText={tempState1 ? "Enter valid email" : ""}
                />
              </FormControl>
            </Grid>
            <Grid item md={5}>
              <FormControl fullWidth error variant="standard">
                {/* <label>Bio</label> */}
                <TextareaAutosize
                  name="bio"
                  value={userData.bio}
                  onChange={onChangeHandler1}
                  aria-label="Bio "
                  minRows={4}
                  placeholder="Bio"
                />
              </FormControl>
            </Grid>
            <Grid item md={5}>
              <FormControl fullWidth error variant="standard">
                {/* <label>Mobile</label> */}
                <TextField
                  name="mobile"
                  value={userData.mobile}
                  onChange={onChangeHandler3}
                  sx={{ bgcolor: "white" }}
                  fullWidth
                  label="Mobile"
                  id="outlined-basic"
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item md={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <label>Date of Birth</label>
                <DatePicker
                  //   label="Date of Birth"
                  sx={{ bgcolor: "black" }}
                  name="dob"
                  value={userData.DOB || null}
                  onChange={(newValue) => {
                    setUserData({ ...userData, DOB: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField fullWidth error={false} {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item md={5} display="flex" justifyContent="center">
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box textAlign="center">
        <Button
          // style={{ display: "flex", justifyContent: "center" }}
          variant="contained"
          onClick={save}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Edit_profile;
