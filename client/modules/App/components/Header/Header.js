import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

export function Header(props) {
  return (
    <div className={styles.banner}>
    <a className={styles.title}>AutoGrader 3.0</a>
    <a className={[styles.right, styles.title].join(' ')}>{props.user}</a>
    </div>
  );
}


export default Header;
