import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// Import Style
// import styles from './Create.css';

import GridTile from 'material-ui/GridList';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';

export class CreateAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div>
       <h1> test </h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAssignment);
