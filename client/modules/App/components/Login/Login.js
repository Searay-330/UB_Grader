import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
// import styles from './Login.css';

import { Button,FormControl,FormGroup,ControlLabel,HelpBlock} from 'react-bootstrap';

export function Login(props) {
  return (
  	<form onSubmit={event => event.preventDefault()}>
        <FormGroup>
          <ControlLabel>Email of account to login to</ControlLabel>
          <FormControl
          	id="loginPageEmailInputBox"
            type="text"
            placeholder="Enter email"
          />
          <FormControl.Feedback />
          <HelpBlock></HelpBlock>
    	<Button bsStyle="primary" onClick={() => {props.changeFunc(document.getElementById("loginPageEmailInputBox").value)}}>Login</Button>
        </FormGroup>
      </form>
  );
}


export default Login;
