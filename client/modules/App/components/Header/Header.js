import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

export function Header() {
  return (
    <div className={styles.banner}>
    <span className={styles.title}>AutoGrader 3.0</span>
    <span className={[styles.right, styles.title].join(' ')}>Login</span>
    </div>
  );
}


export default Header;
