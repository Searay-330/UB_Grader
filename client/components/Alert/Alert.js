import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';


import styles from './Alert.css';


export function Alert(props) {
  return (
    <div className={[styles.alert, styles.error].join(" ")}>
        <span>{props.text}</span>
    </div>
  );
}


export default Alert;
