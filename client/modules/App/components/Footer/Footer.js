import React from 'react';
import { FormattedMessage } from 'react-intl';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
// Import Style
import styles from './Footer.css';


export function Footer() {
  return (
    <Paper zDepth={2} className={styles.footer}>
    <div>
      <p>&copy; 2017 &middot; Challenger &middot; Houston Inc.</p>
    </div>
    </Paper>
  );
}

export default Footer;
