import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// // Import Style
import styles from './Category.css';

export function Category(category) {
  return (
  	<div className={styles.card}>
  		<span id={styles.top}><center>{category.name}</center></span>
  	</div>
  );
}


export default Category;
