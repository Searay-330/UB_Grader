import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
// import styles from './Login.css';

import { Button,FormControl,FormGroup,ControlLabel,HelpBlock} from 'react-bootstrap';

export function Login(props) {
  return (
    	<center><Button bsStyle="primary" onClick={() => {props.changeFunc("richard the shit lorde")}}>Login</Button></center>
  );
}


export default Login;
