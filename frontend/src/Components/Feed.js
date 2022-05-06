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
import InfiniteScroll from "react-infinite-scroll-component";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />; //returns something
});

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
  const [open, setOpen] = useState(false);
  const [toasterClr, setToasterClr] = useState("");
  const [toasterMsg, setToasterMsg] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

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
      .get(`http://localhost:8080/posts/allPosts?pageNo=${page}&size=2`, {
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
        setLoading(false);
      });
  };

  const handleExpandClick = (i) => {
    console.log(i, expanded, "expanded");
    setExpanded(expanded === i ? -1 : i);
  };

  const handleLike = async (postID) => {
    console.log(uid);
    SetAllPost((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postID
          ? {
              ...post,
              likes: post.likes.includes(uid)
                ? post.likes.filter((userID) => userID !== uid)
                : [...post.likes, uid],
            }
          : post
      )
    );
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
    // getAllPosts();
    // SetAllPost(prevPosts => prevPosts.map(post => post._id === postID ? { ...post, likes: post.likes.includes(uid) ? post.likes.filter(userID => userID !== uid) : [...post.likes, uid] } : post))
  };
  const handleComment = async (postID) => {
    if (comment) {
      SetAllPost((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postID
            ? {
                ...post,
                comments: [...post.comments, { userID: uid, comment: comment }],
              }
            : post
        )
      );
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
      // getAllPosts();
      setOpen(true);
      setToasterClr("success");
      setToasterMsg("comment Added Successfully...");
    } else {
      setOpen(true);
      setToasterClr("error");
      setToasterMsg("comment should not be empty...");
    }
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

  const fetchMoreData = () => {
    setTimeout(() => {
      axios
        .get(`http://localhost:8080/posts/allPosts?pageNo=${page}&size=2`, {
          headers: {
            authorization: Token,
          },
        })
        .then((res) => {
          console.log(res);
          SetAllPost([...allPost, ...res.data.message]);
          setPage((prev) => prev + 1);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, 1000);
  };

  //TOASTER
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div
      style={{
        height: "100%",
        borderTop: "10px solid #AFE1AF",
        borderLeft: "20px solid #AFE1AF",
        borderRight: "20px solid #AFE1AF",
        backgroundImage: `url(${whatsAppBack})`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
      }}
    >
      <Header CounterHandler={CounterHandler} />
      <Box
        style={{
          marginTop: "100px",
        }}
      >
        <Grid container>
          <Grid
            item
            md={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <AddPost
              tokenApp={tokenApp}
              getAllPosts={getAllPosts}
              setPage={setPage}
            />
          </Grid>
          <Box style={{ margin: "auto" }}>
            <InfiniteScroll
              dataLength={allPost?.length}
              next={fetchMoreData}
              hasMore={true}
              loader={
                <Box sx={{ minWidth: 500, maxWidth: 500, m: "auto" }}>
                  <Stack spacing={1}>
                    <Skeleton variant="text" />
                    <Skeleton variant="square" width={500} height={60} />
                    {/* <Skeleton variant="rectangular" width={100} height={100} /> */}
                    <Skeleton variant="rectangular" width={500} height={400} />
                    <Skeleton variant="square" width={500} height={60} />
                  </Stack>
                </Box>
              }
            >
              <Box>
                <Box>
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
                                  src={`http://localhost:8080/${
                                    users.filter(
                                      (user) => each.userID === user._id
                                    )[0].image
                                  }`}
                                >
                                  {/* {each.user?.firstname.charAt(0)} */}
                                </Avatar>
                              }
                              titleTypographyProps={{ variant: "h5" }}
                              title={
                                users.filter(
                                  (user) => each.userID === user._id
                                )[0].firstname
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
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {each.caption}
                              </Typography>
                            </CardContent>
                            <CardActions
                              disableSpacing
                              sx={{ padding: "0px 10px" }}
                            >
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
                              <h4 style={{ textAlign: "left" }}>
                                {each.comments.length + " "} Comments
                              </h4>
                            </CardActions>
                            <Collapse
                              in={expanded === i}
                              timeout="auto"
                              unmountOnExit
                            >
                              <CardContent sx={{ padding: "0px 20px" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "0px",
                                  }}
                                >
                                  <div>
                                    <TextField
                                      id="standard-basic"
                                      label="Add Comment"
                                      variant="standard"
                                      // placeholder="Add Comment"
                                      style={{ minWidth: 370, margin: "10px" }}
                                      value={comment}
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                      fullWidth
                                    />
                                  </div>
                                  <div style={{ margin: "auto" }}>
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
                                    <Snackbar
                                      open={open}
                                      autoHideDuration={4000}
                                      onClose={handleClose}
                                    >
                                      <Alert
                                        onClose={handleClose}
                                        severity={toasterClr}
                                        sx={{ width: "100%" }}
                                      >
                                        {toasterMsg}
                                      </Alert>
                                    </Snackbar>
                                  </div>
                                </div>
                                <h4 style={{ padding: "0px" }}>
                                  All Comments:-
                                </h4>
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
                                            src={`http://localhost:8080/${
                                              users.filter(
                                                (user) =>
                                                  each2.userID === user._id
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
                                            <h4 style={{ margin: "10px" }}>
                                              {users.filter(
                                                (user) =>
                                                  each2.userID === user._id
                                              )[0]?.firstname +
                                                "" +
                                                users.filter(
                                                  (user) =>
                                                    each2.userID === user._id
                                                )[0]?.lastname}{" "}
                                              :{" "}
                                            </h4>

                                            <div>
                                              <p style={{ margin: "10px" }}>
                                                {each2.comment}
                                              </p>
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
                </Box>
              </Box>
            </InfiniteScroll>
          </Box>
        </Grid>
      </Box>
    </div>
  );
};

export default Feed;
