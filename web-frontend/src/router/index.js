import React from "react";
import {Router, Route, IndexRoute} from "dva/router";
import Layout from "../components/layouts/basic";
import {HomePage, SigninPage, SignupInfoPage, ValidateMobilePage} from "../components/pages";

// const pageChange = () => window.scrollTo(0, 0);

export default function ({history}) {

  const notLogin = function (nextState, replaceState, callback) {
    // console.log('router-->>>', nextState);
    // 需要做权限控制的时候开启
    // const isLoggedIn = !!store.getState().auth.authenticated
    // if (!isLoggedIn) {
    //   replaceState(null, '/login')
    // }
    callback()
  };

  return (
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={HomePage}/>
        <Route path="signin" component={SigninPage}/>
        <Route path="signup">
          <Route path="validate-mobile" component={ValidateMobilePage}/>
          <Route path="info" component={SignupInfoPage}/>
        </Route>
      </Route>
    </Router>
  );
}
