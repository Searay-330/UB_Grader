import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// Import Style
import styles from './AddUser.css';

//Import Actions
import { submitForm } from './AddUserActions'

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

export class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student_email: '',
      course_role: '',
      course_num: '',
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  fieldChange = (event) => {
      var st = getEditableState(this.state);
      st.course_num = this.props.params.course;
      st.student_email = document.getElementById("student_email").value;
      st.course_role = document.getElementById("course_role").value;
      this.setState(st);
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title="Basic Settings"
            //actAsExpander={true}
            //showExpandableButton={true}
          />
          <CardText expandable={false}>
           <TextField 
              id="student_email"
              value={this.state.student_email} 
              onChange={this.fieldChange}
              hintText="User Email" 
              className={styles.dividerUnder} 
              floatingLabelText="User Email"
            />
            <br/>
            <TextField 
              id="course_role"
              value={this.state.course_role} 
              onChange={this.fieldChange}
              hintText="Course Role" 
              className={styles.dividerUnder} 
              floatingLabelText="Course Role"
            />
            <br/>
            <RaisedButton label='Add User' onClick={() => {this.props.submitForm(this.state)}} primary={true} />
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    submitForm: submitForm,
  }, dispatch);
}


function getEditableState(state){
  return ({
      student_email: state.student_email,
      course_role: state.course_role,
      course_num: state.course_num,
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
