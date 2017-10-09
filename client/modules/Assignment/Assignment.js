import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import moment from '../../../assets/moment.min.js';
//Import Actions
import { submitFile, getRecentSubmission} from './AssignmentActions'
// Import Style
import styles from './Assignment.css';

import Feedback from './components/Feedback/Feedback';
// Import Material UI Components
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

export class Assignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      feedbackVisible: false,
      score: 0,
      fileChosen: false,
      submitted: false,
    };
    this.intervalID = setInterval(() => this.checkFeedback(), 5000);
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  componentWillReceiveProps(NextProps) {
    var courseNum = NextProps.params.course;
    var assignmentNum = NextProps.assignmentData[NextProps.params.assignment].assignment_num;
    var userEmail = NextProps.user.email;
    this.props.getRecentSubmission(courseNum, assignmentNum, userEmail);
  }

  render() {
    var assignmentData = this.props.assignmentData[this.props.params.assignment];
    if (assignmentData == null) { return null; }
    // console.log(assignmentData);
    var due_date = moment(assignmentData.due_date).format('LLL');
    var end_date = moment(assignmentData.end_date).format('LLL');
    var asst_desc = assignmentData.description;
    console.log(assignmentData.problems[0]);
    var problemsArray = assignmentData.problems;
    //Determine maxScore
    var maxScore = 0;
    for(var i = 0; i < problemsArray.length; i++){
      maxScore = maxScore + problemsArray[i].score;
    }
    return (
      <Card>
        <CardTitle title={this.props.params.assignment} subtitle={asst_desc} />
        <CardMedia>
          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow selectable={false}>
                <TableRowColumn>Due date: </TableRowColumn>
                <TableRowColumn>{due_date}</TableRowColumn>
              </TableRow>
              <TableRow selectable={false}>
                <TableRowColumn>Last day to hand in: </TableRowColumn>
                <TableRowColumn>{end_date}</TableRowColumn>
              </TableRow>
              <TableRow selectable={false}>
                <TableRowColumn>Most recent score: </TableRowColumn>
                <TableRowColumn>{(typeof this.props.score === 'number') ? (this.props.score.toString() + "/" + maxScore.toString()) : this.props.score}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </CardMedia>
        <CardText>
          {
            this.state.feedbackVisible
              ? <Feedback rawFeedback={this.props.feedback} />
              : null
          }
          {
            (this.state.fileChosen && !this.state.submitted)
            ? <div><br /></div>
            : null
          }
          {
            this.state.submitted
              ? <p>Your submission has been submitted for review.</p>
              : null
          }
          {
            (this.state.fileChosen || this.state.submitted)
            ? null
            : <div>Please choose a file to submit.</div>
          }
        </CardText>
        <CardActions>
          <RaisedButton
            primary={true}
            label='Choose File'
            containerElement='label'>
            <input id="submission" type="file" style={{ display: 'none' }} onChange={() => this.fileEntered()}/>
          </RaisedButton>
          <RaisedButton disabled={!this.state.fileChosen} label="submit" primary={true} onClick={() => this.sendFile()} />
          <RaisedButton onClick={() => this.hideShowFeedback()} primary={true}
            label={
              this.state.feedbackVisible ? 'Hide Feedback' : 'Show Feedback'
            }
          />
        </CardActions>
      </Card>
    );
  }

  fileEntered() {
    var file = document.getElementById("submission").files[0];
    if(typeof file != undefined) {
      this.setState({
        fileChosen: true,
        submitted: false,
      });
    }
  }

  hideShowFeedback() {
    this.setState({ feedbackVisible: !this.state.feedbackVisible });
  }

  sendFile() {
    var file = document.getElementById("submission").files[0];
    if (typeof file == undefined) {
      this.setState({fileChosen: false});
      return;
    }
    var courseNum = this.props.params.course;
    var assignmentNum = this.props.assignmentData[this.props.params.assignment].assignment_num;
    this.props.submitFile(courseNum, assignmentNum, file);
    this.setState({ 
      fileChosen: false,
      submitted: true,
    });
    document.getElementById("submission").value="";
  }

  checkFeedback() {
    if(!this.state.isMounted) {
      return;
    }
    var courseNum = this.props.params.course;
    var assignmentNum = this.props.assignmentData[this.props.params.assignment].assignment_num;
    var userEmail = this.props.user.email;
    this.props.getRecentSubmission(courseNum, assignmentNum, userEmail);
  }
}
// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    user: state.app.user,
    score: state.assignment.score,
    maxScore: state.assignment.maxScore,
    feedback: state.assignment.feedback,
    assignmentData: state.assignments.assignmentsMap,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    submitFile: submitFile,
    getRecentSubmission: getRecentSubmission,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignment);

