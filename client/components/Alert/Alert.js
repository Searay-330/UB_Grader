import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';


import styles from './Alert.css';


export function Alert(props) {
	switch(props.type){
		case "error":
			return (<div className={[styles.alert, styles.error].join(" ")}><span>{props.text}</span></div>);	
		break;

		case "message":
			return (<div className={[styles.alert, styles.message].join(" ")}><span>{props.text}</span></div>);	
		break;

		case "success":
			return (<div className={[styles.alert, styles.success].join(" ")}><span>{props.text}</span></div>);	
		break;

		default:
			return (<div className={[styles.alert, styles.message].join(" ")}><span>{props.text}</span></div>);	
		break;
	}
  
}


export default Alert;
