import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
// import styles from './Header.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueA400, blueA700, white, black, darkBlack, fullBlack, grey200, grey500, grey600, grey700 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import { fade } from 'material-ui/utils/colorManipulator';



export function Header(props) {
  var appBar = <AppBar showMenuIconButton={false} title="Autograder 3.0" />;
  if (props.user != "") {
    var icon = <FlatButton label={props.user} labelPosition="before" icon={<ActionExitToApp />} href="api/logout" />
    appBar = <AppBar showMenuIconButton={false} title="Autograder 3.0" iconElementRight={icon} />;
  }
  return (
    <div>
        {appBar}
    </div>
  );
}


export default Header;
