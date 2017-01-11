/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import SigninWidget from './modules/Users/pages/SigninPage/SigninPage.js'
import SignupWidget from './modules/Users/pages/SignupPage/SignupPage.js';
import ScheduleWidget from './modules/Schedule/pages/SchedulePage/SchedulePage.js'
import ViewScheduleWidget from './modules/Schedule/pages/ViewSchedulePage/ViewSchedulePage.js'
import BookAppointment from './modules/Appointment/pages/BookAppointment/BookAppointment.js'
import GiveVotePage from './modules/Vote/pages/GiveVotePage/GiveVotePage.js'
import TotalVotesPage from './modules/Vote/pages/TotalVotesPage/TotalVotesPage.js'
import AuthClient from './AuthClient'

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/Post/pages/PostListPage/PostListPage');
  require('./modules/Post/pages/PostDetailPage/PostDetailPage');
}

/*var userLoggedIn = (nextState, replace, callback) => {
  
    if(typeof(Storage) !== "undefined"){
    if (!localStorage.getItem('token')) {
      console.log("not found")
      replace(pathname, '/')
    } else {
    callback();
  }
}
}*/

/*const userIsInATeam = (nextState, replace, callback) => {
        console.log("--------");
  
      if (AuthClient.getToken() == null) {
        replace(`/signin`)
      }
      callback();
}*/

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
        });
      }}
    />
    <Route
      path="/posts/:slug-:cuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
        });
      }}
    />
    <Route
      path="/signin"
      component={SigninWidget}
    />
    <Route
      path="/signup"
      component={SignupWidget}
    />
    <Route
      path="/schedule"
      component={ScheduleWidget}
      
    />
    <Route
      path="/schedule/view"
      component={ViewScheduleWidget}
    />
    <Route
      path="/appointment/book"
      component={BookAppointment}
    />
    <Route
      path="/give_vote"
      component={GiveVotePage}
    />
    <Route
      path="/total_votes"
      component={TotalVotesPage}
    />
  </Route>

);
