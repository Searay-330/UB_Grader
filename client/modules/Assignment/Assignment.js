import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Import Actions
// import {method} from './AssignmentActions'

// Import Style
// import styles from './Assignment.css';

// Import Components



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
     <div>
     <h1>{this.props.routeParams.course}</h1>
     </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    
  };
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Assignment);

