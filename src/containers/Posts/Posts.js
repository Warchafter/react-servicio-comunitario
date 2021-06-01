import React from 'react';
import {
    Typography,
    Container,
    Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import backgroundHeroCondominio from '../../assets/images/condominio-building-background.jpg'
import Pagination from '@material-ui/lab/Pagination';
import PostsList from '../../components/Posts/PostsList/PostsList';


const useStyles = makeStyles((theme) => ({
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundHeroCondominio})`,
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em"
        }
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
    }
}));

const Posts = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Box className={classes.hero}>
                <Box>Blog del Condominio</Box>
            </Box>
            <Container maxWidth="lg" className={classes.postsContainer} >
                <Typography variant="h4" className={classes.postTitle} >
                    Publicaciones
                </Typography>
                <PostsList />
            </Container>
        </React.Fragment>
    )
};

export default Posts;