import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Login.css';

import { Button,FormControl,FormGroup,ControlLabel,HelpBlock} from 'react-bootstrap';

export function Login() {
  return (
    	<center><Link to="/api/auth/google"><Button bsStyle="primary">Login</Button></Link></center>
  );
}


export default Login;
