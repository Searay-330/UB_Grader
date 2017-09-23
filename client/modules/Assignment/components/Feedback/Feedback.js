import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Import Style
//import styles from './Feedback.css';

// Import Bootstrap
// import {Button} from 'react-bootstrap';


export function Feedback(props) {
  return (
  	<div>
  	<textarea disabled rows="32" cols="100" >
  	{props.rawFeedback}
  	</textarea>
    </div>
  )
}



export default Feedback;
