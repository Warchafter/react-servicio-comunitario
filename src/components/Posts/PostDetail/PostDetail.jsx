import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    ButtonBase,
    Card,
    CardActionArea,
    Container,
    CardMedia,
    Grid,
    Paper,
    Typography,
    spacing,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../../store/actions/index';
import Notifier from '../../Notifier/Notifier';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 1.
    },
    postsContainer: {
        paddingTop: theme.spacing(3)
    },
    postTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3),
    },
    card: {
        maxWidth: "100%"
    },
    media: {
        height: 240
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    author: {
        display: "flex"
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    resize: {
        fontSize: 200
    }
}));




// const onFetchPostDetail = useCallback(() => dispatch(actions.fetchPostDetail(postId)), [dispatch, postId]);

// I need to pass in the parameters of fetchPostDetail simply the postData that
// includes the postId and handle the

const Post = (props) => {
    const { match } = props;
    const { params } = match;
    const { postId } = params;

    const dispatch = useDispatch();

    const onFetchPostDetails = useCallback(() => dispatch(actions.fetchPostDetails(postId)), [dispatch, postId]);

    const postData = useSelector(state => state.postDetails.postData);
    const loading = useSelector(state => state.postDetails.loading);
    console.log("PostData Fetched in the .jsx file: ");
    console.log(postData);

    const classes = useStyles();

    useEffect(() => {
        onFetchPostDetails();
    }, [onFetchPostDetails]);

    const generatePostDetailsSkeleton = () => {
        return (
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <Skeleton variant='rect' width={180} height={180} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction='column' spacing={2}>
                            <Grid item xs>
                                <Skeleton animation='wave' variant='text' />
                                <Skeleton animation='wave' variant='text' />
                                <Skeleton animation='wave' variant='text' />
                                <Skeleton animation='wave' variant='text' />
                                <Skeleton animation='wave' variant='text' />
                                <Skeleton animation='wave' variant='text' />
                                <Skeleton animation='wave' variant='text' />
                                <Skeleton animation='wave' variant='text' />
                                <Skeleton animation='wave' variant='text' />
                                <Skeleton animation='wave' variant='text' />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Skeleton animation='wave' variant='circle' width={40} height={40} />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    };

    const generatePostJSX = () => {
        const {
            postDescription,
            postImgLg,
            postTitle,
            postUser,
            postDate,
        } = postData;

        return (
            <Container>
                <Paper>
                    <Grid container spacing={3}>
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="h4" align="center" className={classes.postTitle}>
                                {(postTitle) ? postTitle : "[TÍTULO]"}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                        <Grid item xs={3}>
                            <Box ml={2}>
                                <Typography variant="subtitle2" component="p">
                                    Publicado por:
                                        </Typography>
                                <Typography variant="subtitle2" color="textSecondary" component="p">
                                    {(postUser) ? postUser : "*INGRESE SESIÓN PARA MOSTRAR USUARIO*"}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="subtitle2" component="p" style={{ textAlign: "right" }}>
                                Fecha de publicación:
                                        </Typography>
                            <Typography variant="subtitle2" color="textSecondary" component="p" style={{ textAlign: "right" }}>
                                {postDate}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                        <Grid item xs={2}>

                        </Grid>
                        <Grid item xs={8} >
                            <Paper className={classes.paper}>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            image={(postImgLg) ? postImgLg : "https://firebasestorage.googleapis.com/v0/b/condominio-santa-rita.appspot.com/o/images%2Fplaceholder-image.png?alt=media&token=fbecabf1-07c1-4a43-9b16-8e022730e11d"}
                                            title="Contemplative Reptile"
                                        />
                                    </CardActionArea>
                                </Card>
                            </Paper>
                        </Grid>
                        <Grid item xs={2}>

                        </Grid>
                        <Grid item xs={2}>

                        </Grid>
                        <Grid item xs={8}>
                            <Grid container justify="center">
                                <Typography>
                                    {postDescription}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>

                        </Grid>
                    </Grid>
                </Paper>

            </Container>
        );
    };

    return (
        <React.Fragment>
            <Notifier />
            <Box pt={5}>
                {!loading && postData && generatePostJSX()}
                {loading && generatePostDetailsSkeleton()}
            </Box>
        </React.Fragment>
    );
};

export default Post;