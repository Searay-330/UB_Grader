import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Alert} from '../../../../components/Alert/Alert';

// Import Style
import styles from './CreateCourse.css';

//Import Actions
import { submitForm } from './CreateCourseActions'

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

export class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_num: '',
      display_name: '',
      semester: '',
      student_email: '',
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {

  }

  fieldChange = (event) => {
      var st = getEditableState(this.state);
      st.display_name = document.getElementById("display_name").value;
      st.course_num = document.getElementById("course_num").value;
      st.semester = document.getElementById("semester").value;
      st.student_email = document.getElementById("student_email").value;
      this.setState(st);
  };

  render() {
    return (
      <div>
        {(this.props.errorObject != "") ? <Alert text={this.props.errorObject}/> : null}
        <Card>
          <CardHeader
            title="Basic Settings"
            //actAsExpander={true}
            //showExpandableButton={true}
          />
          <CardText expandable={false}>
           <TextField 
              id="display_name"
              value={this.state.display_name} 
              onChange={this.fieldChange}
              hintText="Display Name" 
              className={styles.dividerUnder} 
              floatingLabelText="Display Name"
            />
            <br/>
            <TextField 
              id="course_num"
              value={this.state.course_num} 
              onChange={this.fieldChange}
              hintText="Course Num (ex: cse331-f17)" 
              className={styles.dividerUnder} 
              floatingLabelText="Course Num (ex: cse331-f17)"
            />
            <br/>
            <TextField 
              id="semester"
              value={this.state.semester} 
              onChange={this.fieldChange}
              hintText="Semester (ex: Fall 2017)" 
              className={styles.dividerUnder} 
              floatingLabelText="Semester (ex: Fall 2017)"
            />
            <br/>
            <TextField 
              id="student_email"
              value={this.state.student_email} 
              onChange={this.fieldChange}
              hintText="Instructor Email" 
              className={styles.dividerUnder} 
              floatingLabelText="Instructor Email"
            />  
            <br />
            <RaisedButton label='Create Course' onClick={() => {this.props.submitForm(this.state)}} primary={true} />
          </CardText>
        </Card>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  console.log(state);
  return {
    coursesData: state.courses.coursesData,
    errorObject: state.create.errorObject,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    submitForm: submitForm,
  }, dispatch);
}


function getEditableState(state){
  return ({
      course_num: state.course_num,
      display_name: state.display_name,
      semester:state.semester,
      student_email: state.student_email,
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourse);
