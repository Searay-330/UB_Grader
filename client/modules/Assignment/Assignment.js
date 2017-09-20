import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Import Actions
// import {method} from './AssignmentActions'

// Import Style
//import styles from './Assignment.css';

import ScoreLine from './components/ScoreLine/ScoreLine';
// Import Bootstrap
import {Button} from 'react-bootstrap';



export class Assignment extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }


  render() {
    return (
    
      <center>
      <div>
        <h1>{this.props.params.assignment}</h1>
        <h3>Due: {this.props.dueDate}</h3>
        <ScoreLine score={this.props.score} scoreTotal={this.props.scoreTotal}/>
        <br/>
        <Button bsStyle="primary">Submit</Button>
      </div>
      </center>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    dueDate: state.assignment.dueDate,
    score: state.assignment.score,
    scoreTotal: state.assignment.scoreTotal,
  };
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Assignment);

