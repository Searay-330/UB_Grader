import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Login.css';

import RaisedButton from 'material-ui/RaisedButton';

export function Login() {
  return (

    <center><div className={styles.div}></div><RaisedButton className={styles.butt} label='Login' primary={true} href="/api/auth/google"/></center>
  );
}


export default Login;
