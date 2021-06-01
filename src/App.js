import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const PostBuilder = React.lazy(() => {
  return import('./components/Posts/PostBuilder/PostBuilder');
});

const Posts = React.lazy(() => {
  return import('./containers/Posts/Posts');
});

const PostDetails = React.lazy(() => {
  return import('./components/Posts/PostDetail/PostDetail');
});

const Payment = React.lazy(() => {
  return import('./containers/Payment/Payment');
});


const App = props => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);


  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Redirect to="/auth" />
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/posts/:postId" render={(props) => <PostDetails {...props} />} />
        <Route path="/post-builder" render={(props) => <PostBuilder {...props} />} />
        <Route path="/register-payment" render={(props) => <Payment {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/posts" component={Posts} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
