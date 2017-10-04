import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// Import Style
import styles from './CreateAssignment.css';

//Import Actions
import { getCategories } from './CreateAssignmentActions'


import GridTile from 'material-ui/GridList';
import {Card, CardText, CardHeader, CardActions, CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
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
    this.state = {
      displayName: '',
      startDate: '',
      dueDate: '',
      endDate: '',
      startTime: '',
      dueTime: '',
      endTime: '',

    };
  }


  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {

  }
   handleChange = (event) => {
    this.setState({
      displayName: document.getElementById("displayName").value,
      startDate: document.getElementById("startDate").value,
      dueDate: document.getElementById("dueDate").value,
      endDate: document.getElementById("endDate").value,
      startTime: document.getElementById("startTime").value,
      dueTime: document.getElementById("dueTime").value,
      endTime: document.getElementById("endTime").value,
    });
 
  };

  render() {
    return (
      <div>
       <Card>
    <CardHeader
      title="Basic Settings"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
    </CardActions>
    <CardText expandable={true}>
    <TextField id="displayName" value={this.state.displayName} onChange={this.handleChange} className={styles.dividerUnder} hintText="Display Name" floatingLabelText="Assignment Name"/>
      <Divider />
      <DatePicker id="startDate" value={this.state.startDate} onChange={this.handleChange} style={{display: 'inline-block'}} floatingLabelText= "Start Date" hintText="Start Date" autoOk={true}/>
      <TimePicker id="startTime" value={this.state.startTime} onChange={this.handleChange} className = {styles.adjust} style={{display: 'inline-block'}} floatingLabelText="Start Time" hintText="Start Time" autoOk={true}/>
      <br />
      <DatePicker id="dueDate" value={this.state.dueDate} onChange={this.handleChange} style={{display: 'inline-block'}} floatingLabelText= "Due Date" hintText="Due Date" autoOk={true}/>
      <TimePicker id="dueTime" value={this.state.dueTime} onChange={this.handleChange} className = {styles.adjust} style={{display: 'inline-block'}} floatingLabelText="Due Time" hintText="Due Time" autoOk={true}/>
      <br />
      <DatePicker id="endDate" value={this.state.endDate} onChange={this.handleChange} style={{display: 'inline-block'}} floatingLabelText= "End Date" hintText="End Date" autoOk={true}/>
      <TimePicker id="endTime" value={this.state.endTime} onChange={this.handleChange} className = {styles.adjust} style={{display: 'inline-block'}} floatingLabelText="End Time" hintText="End Time" autoOk={true}/>
      <br />
      <br />
      <br />
      <RaisedButton label='Create Assignment' primary={true} />
    </CardText>
  </Card>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    assignmentData: state.assignments.assignmentsData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAssignment);
