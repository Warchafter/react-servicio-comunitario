// import React, { useState, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { storage } from '../../firebase/index';

// import {
//     Card,
//     CardMedia,
//     CardContent,
//     CardActions,
//     CardActionArea,
//     Button,
//     Avatar,
//     Typography,
//     Container,
//     Grid,
//     Box,
//     ButtonGroup,
//     Paper,
//     TextField,
//     TextareaAutosize,
// } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import { firstLetterHandler, formatDateCustomFunc, getFirst100Char, getFirst40Char } from '../../shared/utility';
// import * as actions from '../../store/actions/index';

// function LinearProgressWithLabel(props) {
//     return (
//         <Box display="flex" alignItems="center">
//             <Box width="100%" mr={1}>
//                 <LinearProgress variant="determinate" {...props} />
//             </Box>
//             <Box minWidth={35}>
//                 <Typography variant="body2" color="textSecondary">{`${Math.round(
//                     props.value,
//                 )}%`}</Typography>
//             </Box>
//         </Box>
//     );
// }

// const useStyles = makeStyles((theme) => ({
//     root: {
//         width: '100%',
//         flexGrow: 1.
//     },
//     postsContainer: {
//         paddingTop: theme.spacing(3)
//     },
//     postTitle: {
//         fontWeight: 800,
//         paddingBottom: theme.spacing(3),
//     },
//     card: {
//         maxWidth: "100%"
//     },
//     media: {
//         height: 240
//     },
//     cardActions: {
//         display: "flex",
//         margin: "0 10px",
//         justifyContent: "space-between"
//     },
//     author: {
//         display: "flex"
//     },
//     paginationContainer: {
//         display: "flex",
//         justifyContent: "center"
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
//     resize: {
//         fontSize: 200
//     }
// }));

// LinearProgressWithLabel.propTypes = {
//     /**
//      * The value of the progress indicator for the determinate and buffer variants.
//      * Value between 0 and 100.
//      */
//     value: PropTypes.number.isRequired,
// };

// const FirebaseFileUpload = () => {
//     const classes = useStyles();
//     const [image_1, setImage_1] = useState(null);
//     const [image_2, setImage_2] = useState(null);
//     const [url_1, setUrl_1] = useState("");
//     const [url_2, setUrl_2] = useState("");
//     const [progress_1, setProgress_1] = useState(0);
//     const [progress_2, setProgress_2] = useState(0);
//     const [isSmall, setIsSmall] = useState();
//     const [postTitle, setPostTitle] = useState();
//     const [postDescription, setPostDescription] = useState();

//     const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//     const user = useSelector(state => state.auth.user);
//     const userId = useSelector(state => state.auth.userId);
//     const token = useSelector(state => state.auth.token);

//     let postData = {
//         user: user,
//         url_1: url_1,
//         url_2: url_2,
//         postTitle: postTitle,
//         postDescription: postDescription,
//         userId: userId
//     }
//     console.log(postData);
//     console.log(token);

//     const dispatch = useDispatch();

//     const onPublishPost = useCallback(() => dispatch(actions.publishPost(postData, token)), [dispatch, postData, token]);


//     // const dispatch = useDispatch();

//     // const onPublishPost = useCallback(() => dispatch(actions.publishPost(postData)), [dispatch, postData]);

//     // const fileData = useSelector(state => state.imageUp)


//     const handleChange = e => {
//         if (e.target.files[0]) {
//             (isSmall) ? setImage_2(e.target.files[0]) : setImage_1(e.target.files[0]);
//         }
//     };

//     const onInputedTitle = event => {
//         setPostTitle(event.target.value);
//     }

//     const onInputedPostDesc = event => {
//         setPostDescription(event.target.value);
//     }

//     const handleUpload = () => {
//         const temp_image = (isSmall) ? image_2 : image_1
//         const uploadTask = storage.ref(`images/${temp_image.name}`).put(temp_image);
//         uploadTask.on(
//             "state_changed",
//             snapshot => {
//                 const progress = Math.round(
//                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//                 );
//                 (isSmall) ? setProgress_2(progress) : setProgress_1(progress);
//             },
//             error => {
//                 console.log(error);
//             },
//             () => {
//                 storage
//                     .ref("images")
//                     .child(temp_image.name)
//                     .getDownloadURL()
//                     .then(url => { (isSmall) ? setUrl_2(url) : setUrl_1(url) });
//             }
//         );
//     };


//     // console.log("Post image: ", image_1);
//     // console.log("Card image: ", image_2);
//     // console.log("isSmall: ", isSmall)

//     return (
//         <React.Fragment>
//             <Container my={20}>
//                 <Typography variant="h4" className={classes.postTitle} >
//                     Vista Previa de la Publicación
//                 </Typography>
//                 <Grid container spacing={3}>
//                     <Paper>
//                         <Grid item xs={12}>
//                             <TextField
//                                 id="outlined-multiline-static"
//                                 label="Título"
//                                 multiline
//                                 defaultValue="Ingrese el título de la publicación"
//                                 variant="outlined"
//                                 rowsMax={3}
//                                 InputProps={{
//                                     classes: {
//                                         input: classes.rezise
//                                     }
//                                 }}
//                                 style={{ width: "200px" }}
//                                 onChange={(event) => { onInputedTitle(event) }}
//                             />
//                         </Grid>
//                     </Paper>
//                 </Grid>
//                 <Paper >
//                     <Grid container spacing={3}>
//                         <Grid item xs={1}>

//                         </Grid>
//                         <Grid item xs={10}>
//                             <Typography variant="h4" align="center" >
//                                 {(postTitle) ? postTitle : "[TÍTULO]"}
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={1}>

//                         </Grid>
//                         <Grid item xs={3}>

//                         </Grid>
//                         <Grid item xs={3}>
//                             <Box ml={2}>
//                                 <Typography variant="subtitle2" component="p">
//                                     Publicado por:
//                                         </Typography>
//                                 <Typography variant="subtitle2" color="textSecondary" component="p">
//                                     {(user) ? user : "*INGRESE SESIÓN PARA MOSTRAR USUARIO*"}
//                                 </Typography>
//                             </Box>
//                         </Grid>
//                         <Grid item xs={3}>
//                             <Typography variant="subtitle2" component="p" style={{ textAlign: "right" }}>
//                                 Fecha de publicación:
//                                         </Typography>
//                             <Typography variant="subtitle2" color="textSecondary" component="p" style={{ textAlign: "right" }}>
//                                 {formatDateCustomFunc(new Date())}
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={3}>

//                         </Grid>
//                         <Grid item xs={2}>

//                         </Grid>
//                         <Grid item xs={8} >
//                             <Paper className={classes.paper}>
//                                 <Card className={classes.card}>
//                                     <CardActionArea>
//                                         <CardMedia
//                                             component="img"
//                                             alt="Contemplative Reptile"
//                                             image={(url_1) ? url_1 : "https://firebasestorage.googleapis.com/v0/b/condominio-santa-rita.appspot.com/o/images%2Fplaceholder-image.png?alt=media&token=fbecabf1-07c1-4a43-9b16-8e022730e11d"}
//                                             title="Contemplative Reptile"
//                                         />
//                                     </CardActionArea>
//                                 </Card>
//                             </Paper>
//                         </Grid>
//                         <Grid item xs={2}>

//                         </Grid>
//                         <Grid item xs={2}>

//                         </Grid>
//                         <Grid item xs={8} >
//                             <Typography variant="subtitle2" color="textSecondary" component="p">
//                                 {(image_1) ? image_1.name : null}
//                             </Typography>
//                             <LinearProgressWithLabel value={progress_1} />
//                             {/* <input type="file" onChange={handleChange} /> */}
//                             <ButtonGroup
//                                 variant="text"
//                                 color="primary"
//                                 aria-label="text primary button group"
//                             >
//                                 <Button component='label' label='My Label'
//                                 >
//                                     Seleccionar
//                                     <input
//                                         accept="image/*"
//                                         id="raised-button-file"
//                                         type="file"
//                                         onClick={(event) => {
//                                             setIsSmall(false);
//                                             handleChange(event);
//                                         }}
//                                         style={{ display: 'none' }}
//                                     />
//                                 </Button>
//                                 <Button
//                                     type='submit'
//                                     onClick={() => {
//                                         setIsSmall(false);
//                                         handleUpload();
//                                     }}
//                                 >
//                                     Subir
//                                 </Button>
//                             </ButtonGroup>
//                         </Grid>
//                         <Grid item xs={2}>

//                         </Grid>
//                         <Grid item xs={2}>

//                         </Grid>
//                         <Grid item xs={8}>
//                             <Grid container justify="center">
//                                 <TextField
//                                     id="outlined-multiline-static"
//                                     label="Descripción"
//                                     multiline
//                                     defaultValue="¡Ingrese el texto de la publicación aquí!"
//                                     variant="outlined"
//                                     style={{ width: "100%" }}
//                                     onChange={(event) => onInputedPostDesc(event)}
//                                 />
//                             </Grid>
//                         </Grid>
//                         <Grid item xs={2}>

//                         </Grid>
//                     </Grid>
//                 </Paper>

//             </Container>

//             <Container maxWidth="lg" className={classes.postsContainer} >
//                 <Grid container spacing={3}>
//                 </Grid>
//                 <Typography variant="h4" className={classes.postTitle} >
//                     Vista Previa de la Tarjeta
//                         </Typography>
//                 <Grid container spacing={3}>
//                     <Grid item md={4}></Grid>
//                     <Grid item md={4} >
//                         <Card className={classes.card}>
//                             <CardActionArea>
//                                 <CardMedia
//                                     component="img"
//                                     alt="Contemplative Reptile"
//                                     height="140"
//                                     image={(url_2) ? url_2 : "https://firebasestorage.googleapis.com/v0/b/condominio-santa-rita.appspot.com/o/images%2Fplaceholder-image.png?alt=media&token=fbecabf1-07c1-4a43-9b16-8e022730e11d"}
//                                     title="Contemplative Reptile"
//                                 />
//                                 <CardContent>
//                                     <Typography gutterBottom variant="h5" component="h2">
//                                         {getFirst40Char(postTitle)}
//                                     </Typography>
//                                     <Typography variant="body2" color="textSecondary" component="p">
//                                         {getFirst100Char(postDescription)}
//                                     </Typography>
//                                 </CardContent>
//                             </CardActionArea>
//                             <CardActions className={classes.cardActions}>
//                                 <Box className={classes.author}>
//                                     <Avatar>{firstLetterHandler(user)}</Avatar>
//                                     <Box ml={2}>
//                                         <Typography variant="subtitle2" component="p">
//                                             {user}
//                                         </Typography>
//                                         <Typography variant="subtitle2" color="textSecondary" component="p">
//                                             {formatDateCustomFunc(new Date())}
//                                         </Typography>
//                                     </Box>
//                                 </Box>
//                             </CardActions>
//                         </Card>
//                         <Typography variant="subtitle2" color="textSecondary" component="p">
//                             {(image_2) ? image_2.name : null}
//                         </Typography>
//                         <LinearProgressWithLabel value={progress_2} />
//                         {/* <input type="file" onChange={handleChange} /> */}
//                         <ButtonGroup
//                             variant="text"
//                             color="primary"
//                             aria-label="text primary button group"
//                         >
//                             <Button component='label' label='My Label'
//                             >
//                                 Seleccionar
//                                 <input
//                                     accept="image/*"
//                                     id="raised-button-file"
//                                     type="file"
//                                     onClick={(event) => {
//                                         setIsSmall(true);
//                                         handleChange(event);
//                                     }}
//                                     style={{ display: 'none' }}
//                                 />
//                             </Button>
//                             <Button
//                                 type='submit'
//                                 onClick={() => {
//                                     setIsSmall(true);
//                                     handleUpload();
//                                 }}
//                             >
//                                 Subir
//                             </Button>
//                         </ButtonGroup>
//                         <Button component='label' label='My Label' onClick={onPublishPost}>
//                             Publicar
//                         </Button>
//                     </Grid>
//                     <Grid item md={4}></Grid>
//                 </Grid>
//             </Container>
//         </React.Fragment>
//     );
// }

// export default FirebaseFileUpload;