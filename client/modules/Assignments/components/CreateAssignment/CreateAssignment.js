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
      startDate: '',
      dueDate: '',
      endDate: '',
      startTime: '',
      dueTime: '',
      endTime: '',
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
    <TextField id="displayName" hintText="Display Name" value={this.state.displayName} onChange={this.handleChange} className={styles.dividerUnder} floatingLabelText="Assignment Name"/>
      <Divider />
      <DatePicker id="startDate" style={{display: 'inline-block'}} floatingLabelText= "Start Date" hintText="Start Date" autoOk={true}/>
      <TimePicker id="startTime" className = {styles.adjust} style={{display: 'inline-block'}} floatingLabelText="Start Time" hintText="Start Time" autoOk={true}/>
      <br />
      <DatePicker id="dueDate" style={{display: 'inline-block'}} floatingLabelText= "Due Date" hintText="Due Date" autoOk={true}/>
      <TimePicker id="dueTime" className = {styles.adjust} style={{display: 'inline-block'}} floatingLabelText="Due Time" hintText="Due Time" autoOk={true}/>
      <br />
      <DatePicker id="endDate" style={{display: 'inline-block'}} floatingLabelText= "End Date" hintText="End Date" autoOk={true}/>
      <TimePicker id="endTime" className = {styles.adjust} style={{display: 'inline-block'}} floatingLabelText="End Time" hintText="End Time" autoOk={true}/>
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
