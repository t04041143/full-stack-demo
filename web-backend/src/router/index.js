import React from "react";
import {Router, Route, IndexRoute} from "dva/router";
import * as Pages from "../components/pages";
import BasicLayout from "../components/layout/basic";

// const pageChange = () => window.scrollTo(0, 0);

export default function ({history}) {

  // history.push('/signin');

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
      <Route path="/signin" component={Pages.SigninPage}/>
      <Route path="/" component={BasicLayout}>
        <IndexRoute component={Pages.Dashboard}/>
      </Route>
    </Router>
  );
}

// <Route path="/" component={Layout}>
//   <IndexRoute component={HomePage}/>
//   <Route path="signin" component={SigninPage}/>
//   <Route path="signup">
//     <Route path="validate-mobile" component={ValidateMobilePage}/>
//     <Route path="info" component={SignupInfoPage}/>
//   </Route>
// </Route>
