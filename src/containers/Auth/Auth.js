import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Button,
    TextField,
    Link,
    Paper,
    Grid,
    Typography,
    CircularProgress,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import backgroundCondominio from '../../assets/images/sustainable-building-background.jpg'
import Notifier from '../../components/Notifier/Notifier';
import { NearMeOutlined } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    rootLogin: {
        height: '91vh',
    },
    image: {
        backgroundImage: `url(${backgroundCondominio})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'left',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    circularProgress: {
        display: 'flex',
        alignItems: 'center',
    }
}));


const Auth = props => {
    const classes = useStyles();

    const {
        onAuth,
        onAuthUserSignUp,
        onAuthRememberMe,
        loading,
        isAuthenticated
    } = props;

    const [controls, setControls] = useState({
        email: {
            elementConfig: {
                type: 'email',
                placeholder: 'Correo Electrónico'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        name: {
            elementConfig: {
                type: 'name',
                placeholder: 'Nombre de Usuario'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        password: {
            elementConfig: {
                type: 'password',
                placeholder: 'Contraseña'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5
            },
            valid: false,
            touched: false
        },
    })
    const [isSignup, setIsSignup] = useState(false);

    const { authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if (authRedirectPath !== '/posts') {
            onSetAuthRedirectPath();
        }
    }, [authRedirectPath, onSetAuthRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        });
        setControls(updatedControls);
    };

    const resetFormValuesHandler = () => {
        const updatedControls = updateObject(controls, {
            email: updateObject(controls.email, {
                value: '',
                valid: false,
                touched: false
            }),
            name: updateObject(controls.name, {
                value: '',
                valid: false,
                touched: false
            }),
            password: updateObject(controls.password, {
                value: '',
                valid: false,
                touched: false
            })
        });
        setControls(updatedControls);
    }

    const checkBoxChangedHandler = (event) => {
        onAuthRememberMe(event.target.checked);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (!isSignup) {
            onAuth(controls.email.value, controls.password.value);
        } else {
            onAuthUserSignUp(
                controls.email.value,
                controls.name.value,
                controls.password.value
            );
        }
        resetFormValuesHandler();
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }

    const fromElementsArray = [];
    for (let key in controls) {
        fromElementsArray.push({
            id: key,
            config: controls[key]
        });
    };

    let form_fields = fromElementsArray.map(formElement => {
        if (isSignup) {
            return (
                <TextField
                    key={formElement.id}
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name={formElement.id}
                    label={formElement.config.elementConfig.placeholder}
                    type={formElement.config.elementConfig.type}
                    id={formElement.id}
                    error={!formElement.config.valid && formElement.config.touched}
                    onChange={(event) => inputChangedHandler(event, formElement.id)}
                />
            );
        } else if (['email', 'password'].includes(formElement.id) && !isSignup) {
            return (
                <TextField
                    key={formElement.id}
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name={formElement.id}
                    label={formElement.config.elementConfig.placeholder}
                    type={formElement.config.elementConfig.type}
                    id={formElement.id}
                    error={!formElement.config.valid && formElement.config.touched}
                    onChange={(event) => inputChangedHandler(event, formElement.id)}
                />
            );
        } else {
            return null;
        }
    });

    let form = (
        <React.Fragment>
            {form_fields}
            {
                !isSignup ?
                    <FormControlLabel
                        control={<Checkbox value='remember' color='primary' />}
                        label='Remember me'
                        onChange={checkBoxChangedHandler}
                    /> : null
            }
        </React.Fragment>
    )

    if (loading) {
        form = (
            <div className='circularProgress'>
                <CircularProgress />
            </div>
        )
    }

    if (isAuthenticated) {
        return <Redirect to='/posts' />
    }

    return (
        <React.Fragment>
            <Notifier />
            <Grid container component='main' className={classes.rootLogin}>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            {isSignup ? 'Registrar' : 'Iniciar Sesión'}
                        </Typography>
                        <Typography component='h1' variant='h6'>
                            {isSignup ? 'Crear una cuenta' : 'Iniciar sesión en una cuenta'}
                        </Typography>
                        <form className={classes.form} onSubmit={submitHandler}>
                            {form}
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={classes.submit}
                            >
                                {isSignup ? 'Registrar' : 'Iniciar Sesión'}
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href='#' variant='body2' onClick={switchAuthModeHandler}>
                                        {isSignup ? '¿Ya tienes una cuenta? Iniciar Sesión' : '¿No tienes una cuenta? Regístrate'}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onAuthUserSignUp: (email, username, password) => dispatch(actions.authUserSignUp(email, username, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/posts'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);