import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// Import Style
import styles from './CreateAssignment.css';

import GridTile from 'material-ui/GridList';
import {Card, CardText, CardHeader, CardActions, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import TimePicker from 'material-ui/TimePicker';

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
       <Card>
    <CardHeader
      title="Baisc Settings"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
    </CardActions>
    <CardText expandable={true}>
      <DatePicker style={{display: 'inline-block'}} hintText="Start Date" autoOk={true}/>
      <TimePicker style={{display: 'inline-block'}} hintText="Start Time" autoOk={true}/>
      <br />
      <DatePicker hintText="Due Date" />
      <br />
      <DatePicker hintText="End Date" />
      <br />
    </CardText>
  </Card>
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
