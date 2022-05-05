import { Box, Button, Grid, Input, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import Header from "./Header";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import whatsAppBack from "./Images/whatsappBack.jpg";

// import whatsAppBack from "./Images"
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Feed = (props) => {
  const { tokenApp } = props;
  const Token = localStorage.getItem("Token");
  const uid = localStorage.getItem("id");
  // console.log(Token, "hey");
  const key = tokenApp.token;
  const [allPost, SetAllPost] = useState([]);
  const [comment, setComment] = useState("");
  const [expanded, setExpanded] = React.useState(-1);
  const [counter, SetCounter] = useState();
  const [users, setUsers] = useState([]);
  const CounterHandler = (count) => {
    console.log(count);
    SetCounter(count);
  };
  // console.log(tokenApp);
  useEffect(() => {
    getAllPosts();
    getAllUsers();
    /* axios
      .get("http://localhost:8080/posts/allPosts?pageNo=1&size=", {
        headers: {
          authorization: Token,
        },
      })
      .then((res) => {
        console.log(res);
        SetAllPost(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      }); */
  }, [counter]);

  const getAllPosts = () => {
    axios
      .get("http://localhost:8080/posts/allPosts?pageNo=1&size=", {
        headers: {
          authorization: Token,
        },
      })
      .then((res) => {
        console.log(res);
        SetAllPost(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleExpandClick = (i) => {
    console.log(i, expanded, "expanded");
    setExpanded(expanded === i ? -1 : i);
  };

  const handleLike = async (postID) => {
    console.log(uid);
    await axios
      .put(
        `http://localhost:8080/posts/like/${postID}`,
        { userID: uid },
        {
          headers: {
            authorization: Token,
          },
        }
      )
      .then((res) => console.log(res));
    getAllPosts();
  };
  const handleComment = async (postID) => {
    await axios
      .put(
        `http://localhost:8080/posts/comment/${postID}`,
        { comment: comment },
        {
          headers: {
            authorization: Token,
          },
        }
      )
      .then((res) => console.log(res));
    setComment("");
    getAllPosts();
  };

  const getAllUsers = async (id) => {
    await axios
      .get(`http://localhost:8080/users`, {
        headers: {
          authorization: Token,
        },
      })
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      });
  };

  return (
    <div
      style={{
        height: "100%",
        borderTop: "10px solid #AFE1AF",
        borderLeft: "20px solid #AFE1AF",
        borderRight: "20px solid #AFE1AF",
        backgroundImage: `url(${whatsAppBack})`,
      }}
    >
      <Header CounterHandler={CounterHandler} />
      <Box
        style={{
          marginTop: "70px",
        }}
      >
        <Grid container>
          <Grid
            item
            md={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <AddPost tokenApp={tokenApp} />
          </Grid>
          <Grid item md={12}>
            <Grid container spacing={3} rowSpacing={2}>
              {allPost?.map((each, i) => {
                console.log(
                  users.filter((user) => each.userID === user._id)[0].image
                );
                return (
                  <>
                    {console.log(each)}
                    <Grid
                      item
                      md={12}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "30px",
                      }}
                    >
                      <Card
                        sx={{
                          minWidth: 500,
                          maxWidth: 500,
                          // padding: "15px",
                          // border: "1px solid black",
                          marginRight: "20px",
                        }}
                      >
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{ bgcolor: red[500] }}
                              aria-label="recipe"
                              // src={each.user.image}
                              src={`http://localhost:8080/${users.filter(
                                (user) => each.userID === user._id
                              )[0].image
                                }`}
                            >
                              {/* {each.user?.firstname.charAt(0)} */}
                            </Avatar>
                          }
                          titleTypographyProps={{ variant: "h5" }}
                          title={
                            users.filter((user) => each.userID === user._id)[0]
                              .firstname
                          }
                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                        />
                        {console.log(each.image)}
                        <CardMedia
                          component="img"
                          height="294"
                          image={`http://localhost:8080/${each.image}`}
                          alt="Paella dish"
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            {each.caption}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          {each.likes.includes(uid) ? (
                            <IconButton aria-label="add to favorites">
                              <FavoriteIcon
                                style={{ color: "red" }}
                                onClick={() => handleLike(each._id)}
                              />
                            </IconButton>
                          ) : (
                            <IconButton aria-label="add to favorites">
                              <FavoriteIcon
                                onClick={() => handleLike(each._id)}
                              />
                            </IconButton>
                          )}
                          {each.likes.length ? each.likes.length : 0} Likes
                          <ExpandMore
                            expand={expanded}
                            onClick={() => handleExpandClick(i)}
                            aria-expanded={expanded === i}
                            aria-label="show more"
                          >
                            <ExpandMoreIcon />
                          </ExpandMore>
                          <h4 style={{ textAlign: "left" }}>Comments</h4>
                        </CardActions>
                        <Collapse
                          in={expanded === i}
                          timeout="auto"
                          unmountOnExit
                        >
                          <CardContent>
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              {/* <div>
                                <TextareaAutosize
                                  aria-label="minimum height"
                                  minRows={3}
                                  placeholder="Add Comment"
                                  style={{ minWidth: 200, margin: "10px" }}
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                />
                              </div> */}
                              <div>
                                <TextField
                                  id="standard-basic"
                                  label="Add Comment"
                                  variant="standard"
                                  // placeholder="Add Comment"
                                  style={{ minWidth: 350, margin: "10px" }}
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  fullWidth
                                />
                              </div>
                              <div>
                                <Button
                                  size="small"
                                  sx={{
                                    color: "#097969",
                                    fontWeight: "bolder",
                                  }}
                                  onClick={() => handleComment(each._id)}
                                >
                                  POST
                                </Button>
                              </div>
                            </div>
                            <h4>All Comments:-</h4>
                            {each.comments?.map((each2) => {
                              return (
                                <>
                                  {console.log(each2)}
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      gap: "5px",
                                    }}
                                  >
                                    <div>
                                      <Avatar
                                        sx={{
                                          bgcolor: red[500],
                                          height: "25px",
                                          width: "25px",
                                          fontSize: "15px",
                                        }}
                                        aria-label="recipe"
                                        src={`http://localhost:8080/${users.filter(
                                          (user) => each2.userID === user._id
                                        )[0]?.image
                                          }`}
                                      >
                                        {/* {each2.user.charAt(0)} */}
                                      </Avatar>
                                    </div>
                                    <div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          alignItems: "center",
                                        }}
                                      >
                                        <h4>
                                          {users.filter(
                                            (user) => each2.userID === user._id
                                          )[0]?.firstname +
                                            "" +
                                            users.filter(
                                              (user) =>
                                                each2.userID === user._id
                                            )[0]?.lastname}{" "}
                                          :{" "}
                                        </h4>

                                        <div>
                                          <p> {each2.comment}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </CardContent>
                        </Collapse>
                      </Card>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Feed;
