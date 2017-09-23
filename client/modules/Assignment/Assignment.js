import React, { Component, PropTypes } from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

//Import Actions
// import {method} from './AssignmentActions'

// Import Style
import styles from './Assignment.css';

import Feedback from './components/Feedback/Feedback';
// Import Bootstrap
import {Button} from 'react-bootstrap';



export class Assignment extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      isMounted: false, 
      feedbackVisible: false, 
      score: 0,
      submitted: false
    };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    
    return (
    
   
      <div>
      <center>
        <h1>{this.props.params.assignment}</h1>
        <h3>Due: {this.props.dueDate}</h3>
        <h3 className={styles.h3}>Most recent score: {this.state.score}/{this.props.scoreTotal} </h3>
        <Button onClick={() => this.hideShowFeedback()}  bsStyle="primary" bsSize="xsmall">{
          this.state.feedbackVisible
            ? 'Hide Feedback'
            : 'Show Feedback'
        }</Button>

        <br/>
        <br/>
        
    
       
        <input className={styles.input} type="file" />
        <br/>
        <Button onClick={() => this.randoScore(this.props.scoreTotal)} bsStyle="primary">Submit</Button>
        
        <br/>
        <br/>

        {
         this.state.submitted
            ?  <p>Your submission has been successfully forwarded to daviddob@buffalo.edu for review.</p>
            : null
         }
        
        {
          this.state.feedbackVisible
            ? <Feedback rawFeedback={this.props.feedback}/>
            : null
        }

        
        

       
      </center>
      </div>

     
    );
  }

  hideShowFeedback() {
    this.setState({feedbackVisible: !this.state.feedbackVisible});
  }

  randoScore(maxScore){
    this.setState({submitted: true});
    var score = Math.random() * maxScore;
    score = Math.floor(score);
    this.setState({score: score});
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    dueDate: state.assignment.dueDate,
    score: state.assignment.score,
    scoreTotal: state.assignment.scoreTotal,
    feedback: state.assignment.feedback,
  };
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Assignment);

