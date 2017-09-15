import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
// import styles from './Login.css';

import { Button } from 'react-bootstrap';

export function Login(props) {
  return (
  	<div>
    	<input type="text" />
    	&nbsp;
    	<Button bsStyle="primary" onClick={() => {props.changeFunc("jim bob")}}>Login</Button>
    </div>
  );
}


export default Login;
