import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
// import styles from './Login.css';

export function Login(props) {
  return (
  	<div>
    	<input type="text" />
    	&nbsp;
    	<button onClick={() => {props.changeFunc("jim bob")}}>Login</button>
    </div>
  );
}


export default Login;
