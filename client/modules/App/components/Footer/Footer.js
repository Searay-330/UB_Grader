import React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Footer.css';


export function Footer() {
  return (
    <div className={styles.footer}>
      <p>&copy; 2017 &middot; Challenger &middot; Houston Inc.</p>
    </div>
  );
}

export default Footer;
