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

const AddPost = (props) => {
  const Navigate = useNavigate();
  var { CounterHandler } = props;
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
  };

  // var output = document.getElementById("output");
  // output.src = URL.createObjectURL(e.target.files[0]);
  // console.log(output.src);
  // output.onload = function () {
  //   URL.revokeObjectURL(output.src); // free memory
  // };

  const PostHandler = () => {
    formData.append("image", addPost.image);
    formData.append("caption", addPost.caption);
    formData.append("userID", addPost.userID);
    console.log(formData.get("image"));
    axios
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
      })
      .catch((err) => {
        console.log(err);
        formData.delete("image");
        formData.delete("caption");
        formData.delete("userId");
      });
    setAddPost({ userID: id, image: "", caption: "" });
  };
  console.log(addPost);
  return (
    <Card
      sx={{
        maxWidth: 345,
        padding: "15px",
        border: "1px solid black",
        marginRight: "20px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          display: "flex",
          margin: "20px",
          justifyContent: "center",
        }}
        gutterBottom
        component="div"
      >
        Add Post
      </Typography>

      <img
        src={addPost.image ? preview : tempImg}
        alt=""
        className="image"
        id="output"
      />

      <input
        style={{ padding: "16px", wordWrap: " break-word" }}
        type="file"
        accept="image/*"
        onChange={(e) => uploadPicHandler(e)}
      />
      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="div">
          Picture
        </Typography> */}
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          value={addPost.caption}
          onChange={(e) => setAddPost({ ...addPost, caption: e.target.value })}
          placeholder="caption"
          style={{ width: "80%" }}
        />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ color: "#097969", fontWeight: "bolder" }}
          onClick={PostHandler}
        >
          POST
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddPost;
