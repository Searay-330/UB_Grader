import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

import {Glyphicon} from 'react-bootstrap'; 

export function Header(props) {
	var pageinfo = null;
	if(props.user == ""){
		pageinfo = <span className={[styles.right, styles.title].join(' ')}>{props.user}</span>;
	}else{
		pageinfo = <span className={[styles.right, styles.title].join(' ')}>Welcome, {props.user}<Link to='/api/logout'><Glyphicon className={[styles.right, styles.headerIcon, styles.title].join(' ')} glyph="log-out" /></Link></span>;
	}
  return (
    <div className={styles.banner}>
    <span className={[styles.title].join(' ')}>AutoGrader 3.0</span>
	{pageinfo}
    </div>
  );
}


export default Header;
