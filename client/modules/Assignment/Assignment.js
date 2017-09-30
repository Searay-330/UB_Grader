import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

//Import Actions
import {getAssignmentData} from './AssignmentActions'
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
      submitted: false
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  render() {
    var maxScore = this.props.scoreTotal;
    return (
      <Card>
       
        <CardTitle
          title={this.props.params.assignment}
        />
        <CardMedia>
          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow selectable={false}>
                <TableRowColumn>Due: </TableRowColumn>
                <TableRowColumn>{this.props.dueDate}</TableRowColumn>
              </TableRow>
              <TableRow selectable={false}>
                <TableRowColumn>Most recent score: </TableRowColumn>
                <TableRowColumn>{this.state.score}/{maxScore}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </CardMedia>
        <CardText>
          {
            this.state.submitted
              ? <p>Your submission has been successfully forwarded to daviddob@buffalo.edu for review.</p>
              : null
          }
          {
            this.state.feedbackVisible
              ? <Feedback rawFeedback={this.props.feedback} />
              : null
          }
        </CardText>
        <CardActions>
        <RaisedButton
            primary={true}
            label='Choose File'
            containerElement='label'>
            <input type="file" style={{ display: 'none' }}/>
          </RaisedButton>
          <RaisedButton label="Submit" primary={true} onClick={() => this.randoScore(maxScore)} />
          <RaisedButton onClick={() => this.hideShowFeedback()} primary={true}
            label={
              this.state.feedbackVisible ? 'Hide Feedback' : 'Show Feedback'
            }
          />
        </CardActions>
      </Card>
    );
  }

  hideShowFeedback() {
    this.setState({ feedbackVisible: !this.state.feedbackVisible });
  }

  randoScore(maxScore) {
    this.setState({ submitted: true });
    var score = Math.random() * maxScore;
    score = Math.floor(score);
    this.setState({ score: score });
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    dueDate: state.assignment.dueDate,
    score: state.assignment.score,
    scoreTotal: state.assignment.scoreTotal,
    feedback: state.assignment.feedback,
    assignmentData: state.assignment.assignmentData,
  };
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    getAssignmentData:getAssignmentData,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignment);

