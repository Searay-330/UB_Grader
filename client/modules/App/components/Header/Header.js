import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import ActionHome  from 'material-ui/svg-icons/action/home';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import styles from './Header.css';



export function Header(props) {
  var displayMenu = props.menuItems && props.user != "";
  displayMenu = (displayMenu == undefined)? false : displayMenu;
  var appBar = <AppBar showMenuIconButton={false} onTitleTouchTap={()=>{window.location="/"}} title={<span className={styles.point}>Autograder 3.0</span>} />;
  var menu = null;
  if (props.user != "") {
    var icon = <FlatButton label={props.user} labelPosition="before" icon={<ActionExitToApp />} href="/api/logout" />
    appBar = <AppBar showMenuIconButton={displayMenu} onLeftIconButtonTouchTap={() => {props.drawerFunction(true);}} onTitleTouchTap={()=>{window.location="/"}} title={<span className={styles.point}>Autograder 3.0</span>} iconElementRight={icon} />;
    if(displayMenu)
    {
      menu = <Drawer docked={false} width={200} open={props.drawerVar} onRequestChange={(open)=>{props.drawerFunction(open)}}>{props.menuItems}</Drawer>;
    }

  }
  return (
    <div>
        {appBar}
        {menu}
    </div>
  );
}



export default Header;
