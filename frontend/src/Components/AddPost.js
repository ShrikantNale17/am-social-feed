import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import axios from "axios";
import "./CSS/AddPostc.css";
import { useNavigate } from "react-router-dom";
import lightWhatsImg from "./Images/lightWhatsImg.png";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddPost = (props) => {
  const imageRef = React.useRef();
  const Navigate = useNavigate();
  var { CounterHandler, SetAllPost, getAllPosts, setPage } = props;
  const Token = localStorage.getItem("Token");
  const id = localStorage.getItem("id");
  const [count, setCount] = React.useState(1);
  const formData = new FormData();
  const tempImg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  const [counter, setCounter] = React.useState(1);
  const [preview, setPreview] = React.useState();

  const [addPost, setAddPost] = React.useState({
    userID: id,
    image: "",
    caption: "",
  });

  const [open, setOpen] = React.useState(false);
  const [toasterClr, setToasterClr] = React.useState("");
  const [toasterMsg, setToasterMsg] = React.useState("");

  React.useEffect(() => {
    if (!localStorage.getItem("Token")) {
      Navigate("/login");
    }
    if (!addPost.image) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(addPost.image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [addPost.image]);

  const uploadPicHandler = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setAddPost({
        ...addPost,
        image: undefined,
      });

      return;
    }
    setAddPost({ ...addPost, image: e.target.files[0] });
    // imageRef.current.value = null;
  };

  // var output = document.getElementById("output");
  // output.src = URL.createObjectURL(e.target.files[0]);
  // console.log(output.src);
  // output.onload = function () {
  //   URL.revokeObjectURL(output.src); // free memory
  // };

  const PostHandler = async () => {
    formData.append("image", addPost.image);
    formData.append("caption", addPost.caption);
    formData.append("userID", addPost.userID);
    console.log(formData.get("image"));
    await axios
      .post("http://localhost:8080/posts/addPost", formData, {
        headers: {
          authorization: Token,
        },
      })
      .then((res) => {
        console.log(res);
        formData.delete("image");
        formData.delete("caption");
        formData.delete("userId");
        var temp = count + 1;
        setCount(count + 1);
        CounterHandler = temp;
        setAddPost({ userID: id, image: "", caption: "" });
        setOpen(true);
        setToasterClr("success");
        setToasterMsg("Post Added Successfully...");
        imageRef.current.value = null;
        SetAllPost(prev => [res.data.post, ...prev])
      })
      .catch((err) => {
        console.log(err);
        formData.delete("image");
        formData.delete("caption");
        formData.delete("userId");
        setOpen(true);
        setToasterClr("error");
        setToasterMsg("Post Not Added Try Again...");
      });
    setAddPost({ userID: id, image: "", caption: "" });
    // setPage(1);
    // getAllPosts();
  };
  console.log(addPost);

  //toaster
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        padding: "15px",
        border: "1px solid black",
        marginRight: "20px",
        backgroundImage: `url(${lightWhatsImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minWidth: 400,
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          display: "flex",
          margin: "10px",
          justifyContent: "center",
        }}
        gutterBottom
        component="div"
      >
        Add Post
      </Typography>
      <Box
        sx={{
          margin: "auto",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <img
            src={addPost.image ? preview : tempImg}
            alt=""
            className="image"
            id="output"
            style={{ width: "200px", height: "200px" }}
          />
        </Box>
        <Box>
          <input
            style={{
              padding: "16px",
              wordWrap: " break-word",
              // marginLeft: "70px",
            }}
            type="file"
            ref={imageRef}
            accept="image/*"
            onChange={(e) => uploadPicHandler(e)}
          />
        </Box>
      </Box>
      <Box style={{ display: "flex", flexDirection: "row", margin: "auto" }}>
        <Box>
          <CardContent>
            <TextField
              id="outlined-basic"
              // label="Caption"
              variant="outlined"
              placeholder="Add Caption ..."
              value={addPost.caption}
              onChange={(e) =>
                setAddPost({ ...addPost, caption: e.target.value })
              }
              // style={{ width: "80%" }}
              inputProps={{
                style: {
                  fontFamily: "nunito",
                  color: "Black",
                  border: "1px solid #097969",
                  width: "150%",
                },
              }}
              fullWidth
            />
          </CardContent>
        </Box>
        <Box>
          <CardActions>
            <Button
              size="small"
              sx={{
                color: "#097969",
                fontWeight: "bolder",
                padding: "20px 20px 20px 7px",
                margin: "none",
                fontSize: "16px",
              }}
              onClick={PostHandler}
            >
              POST
            </Button>

            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={toasterClr}
                sx={{ width: "100%" }}
              >
                {toasterMsg}
              </Alert>
            </Snackbar>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
};

export default AddPost;
