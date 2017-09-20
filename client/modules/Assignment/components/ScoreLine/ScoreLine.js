import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
import styles from './ScoreLine.css';

// Import Bootstrap
import {Button} from 'react-bootstrap';


export function ScoreLine(props) {
  return (
  	<div>
  	<h3 className={styles.h3}>Most recent score: {props.score}/{props.scoreTotal} </h3>
    <Button bsStyle="primary" bsSize="xsmall">View Feedback</Button>
    </div>
  )
}

export default ScoreLine;
