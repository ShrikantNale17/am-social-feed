import React from 'react'

function CardActions() {
    return (
        <>
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
                <h4 style={{ textAlign: "left" }}>Comments</h4>
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
                                onChange={(e) => setComment(e.target.value)}
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
                    <h4 style={{ padding: "0px" }}>All Comments:-</h4>
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
        </>
    )
}

export default CardActions