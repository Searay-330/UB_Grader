/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import Bs from './modules/bs/bs';
import Courses from './modules/Courses/Courses'
import Assignments from './modules/Assignments/Assignments';
import Assignment from './modules/Assignment/Assignment';
import Gradebook from './modules/Gradebook/Gradebook';
import CreateAssignment from './modules/Assignments/components/CreateAssignment/CreateAssignment';
import CreateCourse from './modules/Courses/components/CreateCourse/CreateCourse';
import AddUser from './modules/Courses/components/AddUser/AddUser';

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
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
  	<Route path="/api/auth/google" component={() => window.location = "/api/auth/google" } />
    <Route path="/api/logout" component={() => window.location = "/api/logout" } />
    <Route path="testing" component={Bs}/>
    <Route path ="/courses/:course/adduser" component={AddUser}/>
    <Route path ="/courses/create" component={CreateCourse}/>
    <Route path="/courses" component={Courses}/>
    <Route path="/courses/:course/assignments" component={Assignments}>
      <Route path='/courses/:course/assignments/gradebook' component={Gradebook}/>
      <Route exact path="/courses/:course/assignments/create" component={CreateAssignment}/>
      <Route path="/courses/:course/assignments/:assignment" component={Assignment}/>
    </Route>
  </Route>

);
