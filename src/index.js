import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';
import authReducer from './store/reducers/auth';
import snackbarReducer from './store/reducers/snackbar';
import postsReducer from './store/reducers/posts';
import postBuilderReducer from './store/reducers/postBuilder';
import postDetailsReducer from './store/reducers/postDetails';
import { watchAuth, watchPosts, watchPayments } from './store/sagas';
import { green } from '@material-ui/core/colors';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
    postBuilder: postBuilderReducer,
    postDetails: postDetailsReducer,
    snackbar: snackbarReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#87e0ff"
        },
        secondary: green,
        type: "dark",
    },
    status: {
        danger: 'orange',
    },
});

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchPosts);
sagaMiddleware.run(watchPayments);

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
            <BrowserRouter>
                <React.StrictMode>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <App />
                    </ThemeProvider>
                </React.StrictMode>
            </BrowserRouter>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);

// ReactDOM.render(app, document.getElementById('root'));
// registerServiceWorker();

