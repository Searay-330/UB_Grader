import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';


import styles from './Alert.css';

var classname;

export function Alert(props) {

	switch(props.type){
		case "error":
			classname = styles.error;
		break;
		
		case "success":
			classname = styles.success;	
		break;

		default:
			classname = styles.message;
		break;
	}
		return (<div id = "alert" className={[styles.alert, classname].join(" ") } onClick = { () => wasClicked() }><span>{props.text}</span></div>);	
}

function wasClicked(){
	document.getElementById("alert").remove();
}

export default Alert;