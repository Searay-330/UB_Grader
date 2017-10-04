import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// Import Style
import styles from './CreateCourse.css';

//Import Actions


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
            title="Basic Settings"
            //actAsExpander={true}
            //showExpandableButton={true}
          />
          <CardText expandable={false}>
            <TextField 
              hintText="Course Name" 
              className={styles.dividerUnder} 
              floatingLabelText="Course Name"
            />
            <br/>
            <TextField 
              hintText="Semester (example: fa17)" 
              className={styles.dividerUnder} 
              floatingLabelText="Semester (example: fa17)"
            />
            <br/>
            <TextField 
              hintText="Instructor Email" 
              className={styles.dividerUnder} 
              loatingLabelText="Instructor Email"
            />  
            <br />
            <RaisedButton label='Create Course' primary={true} />
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

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourse);
