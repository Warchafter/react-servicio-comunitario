import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';

import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    CardActionArea,
    Avatar,
    Typography,
    Grid,
    Box,
} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';
import * as actions from '../../../store/actions/index';
import {
    firstLetterHandler,
    getFirst100Char,
    getFirst40Char
} from '../../../shared/utility';

const useStyles = makeStyles(theme => ({

}));

const PostsList = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loading = useSelector(state => state.posts.loading);
    const posts = useSelector(state => state.posts.posts);
    const onFetchPosts = useCallback(() => dispatch(actions.fetchPosts()), [dispatch]);

    useEffect(() => {
        (isAuthenticated && onFetchPosts());
    }, [onFetchPosts, isAuthenticated]);


    const getPostCard = post => {
        const {
            postDate,
            postDescription,
            postImgSm,
            postTitle,
            postUser,
            postId
        } = post;

        return (

            <Grid item xs={12} sm={6} md={4} onClick={() => history.push(`/posts/${postId}`)} key={postId} >
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={postImgSm}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {getFirst40Char(postTitle)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {getFirst100Char(postDescription)}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.cardActions}>
                        <Box className={classes.author}>
                            <Avatar>{firstLetterHandler(postUser)}</Avatar>
                            <Box ml={2}>
                                <Typography variant="subtitle2" component="p">
                                    {postUser}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" component="p">
                                    {postDate}
                                </Typography>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Grid>
        );
    };

    const getPostCardSkeleton = (quantity) => {
        const cards = [];
        for (let i = 1; i <= quantity; i++) {
            cards.push(
                <Grid item xs key={i}>
                    <Skeleton variant="rect" width={150} height={160} />
                </Grid>
            );
        }

        return cards;
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {(posts && !loading) ? (
                    posts.map(post =>
                        getPostCard(post)
                    )
                ) : (
                    getPostCardSkeleton(3)
                )}
            </Grid>
        </div>
    );
};

export default PostsList;