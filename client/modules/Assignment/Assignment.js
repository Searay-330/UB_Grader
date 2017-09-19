import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Import Actions
// import {method} from './AssignmentActions'

// Import Style
// import styles from './Assignment.css';

// Import Components
import Category from './componets/Category/Category';



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
      <Category name={this.props.categories[0]}/>
     </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    categories: state.assignment.categories,
  };
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Assignment);

