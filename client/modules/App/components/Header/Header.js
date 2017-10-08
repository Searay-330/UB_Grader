import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ActionHome  from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import styles from './Header.css';



export function Header(props) {
  var appBar = <AppBar showMenuIconButton={false} onTitleTouchTap={()=>{window.location="/"}} title={<span className={styles.point}>Autograder 3.0</span>} />;
  if (props.user != "") {
    var icon = <FlatButton label={props.user} labelPosition="before" icon={<ActionExitToApp />} href="/api/logout" />
    appBar = <AppBar showMenuIconButton={false} onTitleTouchTap={()=>{window.location="/"}} title={<span className={styles.point}>Autograder 3.0</span>} iconElementRight={icon} />;
  }
  return (
    <div>
        {appBar}
    </div>
  );
}


export default Header;
