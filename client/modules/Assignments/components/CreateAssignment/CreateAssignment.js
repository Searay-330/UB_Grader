import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Alert} from '../../../../components/Alert/Alert';


// Import Style
import styles from './CreateAssignment.css';

//Import Actions
import { getCategories, submitForm } from './CreateAssignmentActions'



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
import AutoComplete from 'material-ui/AutoComplete';
import TimePicker from 'material-ui/TimePicker';



export class CreateAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      displayName: "",
      startDate: null,
      dueDate: null,
      endDate: null,
      startTime: null,
      dueTime: null,
      endTime: null,
      category: "",
      problems: [],
      num_probs: 0
    };
    this.authed = false;
  }


  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.admin){
      this.authed = true;
    }
    else if(nextProps.perms[nextProps.params.course] == "student"){
      window.location = "/courses/" + nextProps.params.course + "/assignments"; 
    }else if(nextProps.perms[nextProps.params.course]){
      this.authed = true;
    }
    if(nextProps.redirect){
      this.context.router.push("/courses/" + nextProps.params.course + "/assignments");
    }
  }

  wrapperFunction = (location)=>{return (event,date) => {this.dateChange(event,date,location)}};


  dateChange = (event, date, location) => {
    var st  = getEditableState(this.state);
    st.startDate = (location == "startDate") ? date : st.startDate;
    st.dueDate = (location == "dueDate") ? date : st.dueDate;
    st.endDate = (location == "endDate") ? date : st.endDate;
    st.startTime = (location == "startTime") ? date : st.startTime;
    st.dueTime = (location == "dueTime") ? date : st.dueTime;
    st.endTime = (location == "endTime") ? date : st.endTime;
    this.setState(st);
  };

  otherChange = (event) => {
      var st = getEditableState(this.state);
      st.displayName = document.getElementById("displayName").value;
      st.name = document.getElementById("name").value;
      st.category = (typeof event == "string") ? event : st.category;
      this.setState(st);
  };

  problemChange = (event,newValue) => {
    var data = event.target.id.split("-");
    var st = getEditableState(this.state);
  
    st.problems[data[1]][data[0]] = newValue;
    this.setState(st);
  };


  addProblem = () => {
    var st = getEditableState(this.state);
    st.problems.push({problem_name:"", score: ""});
    st.num_probs++;
    this.setState(st);
  };



  render() {
    if(!this.authed){
      return(null);
    }
    var problemHTML = (id_num) => {return(<span key={id_num}><TextField  id={"problem_name-" + id_num}  value={this.state.problems[id_num].problem_name} onChange={this.problemChange}  hintText="Problem Name" floatingLabelText="Problem Name"/><br /><TextField id={"score-" + id_num} value={this.state.problems[id_num].score} onChange={this.problemChange}  hintText="Max Score" floatingLabelText="Max Score"/><br /><br/></span>)};
    var displayProblems = [];
    for (var i = 0; i < this.state.num_probs; i++) {
      displayProblems.push(problemHTML(i));
    }
    return (
      <div>
      {(this.props.errorObject != "") ? <Alert text={this.props.errorObject} type="error"/> : null}
       <Card initiallyExpanded={true}>
    <CardHeader
      title="Basic Settings"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>
    <TextField id="displayName" value={this.state.displayName} onChange={this.otherChange}  hintText="Display Name" floatingLabelText="Assignment Display Name"/>
    <TextField id="name" value={this.state.name} onChange={this.otherChange} className = {styles.adjust} hintText="Name" floatingLabelText="Assignment Name"/>
      <br />
      <DatePicker id="startDate" value={this.state.startDate} onChange={this.wrapperFunction("startDate")} style={{display: 'inline-block'}} floatingLabelText= "Start Date" hintText="Start Date" autoOk={true}/>
      <TimePicker id="startTime" value={this.state.startTime} onChange={this.wrapperFunction("startTime")} className = {styles.adjust} style={{display: 'inline-block'}} floatingLabelText="Start Time" hintText="Start Time"/>
      <br />
      <DatePicker id="dueDate" value={this.state.dueDate} onChange={this.wrapperFunction("dueDate")} style={{display: 'inline-block'}} floatingLabelText= "Due Date" hintText="Due Date" autoOk={true}/>
      <TimePicker id="dueTime" value={this.state.dueTime} onChange={this.wrapperFunction("dueTime")} className = {styles.adjust} style={{display: 'inline-block'}} floatingLabelText="Due Time" hintText="Due Time"/>
      <br />
      <DatePicker id="endDate" value={this.state.endDate} onChange={this.wrapperFunction("endDate")} style={{display: 'inline-block'}} floatingLabelText= "End Date" hintText="End Date" autoOk={true}/>
      <TimePicker id="endTime" value={this.state.endTime} onChange={this.wrapperFunction("endTime")} className = {styles.adjust} style={{display: 'inline-block'}} floatingLabelText="End Time" hintText="End Time" />
      <br />
      <AutoComplete id="category" value={this.state.category} onUpdateInput={this.otherChange} floatingLabelText="Category" filter={AutoComplete.noFilter} openOnFocus={true} dataSource = {getCategories(this.props.assignmentsData)}/>
      <br />
      <br />
      <br />
    </CardText>
  </Card>

  <br />

  <Card initiallyExpanded={false}>
    <CardHeader
      title="Autograder Settings"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>
      <RaisedButton
          primary={true}
          label='Make File'
          containerElement='label'>
          <input id="make" type="file" style={{ display: 'none' }}/>
        </RaisedButton>
        <br/>
        <br/>
        <br/>
      <RaisedButton
          primary={true}
          label='Tar Ball'
          containerElement='label'>
          <input id="tar" type="file" style={{ display: 'none' }}/>
        </RaisedButton>
    </CardText>
  </Card>

  <br />
  <Card initiallyExpanded={false}>
    <CardHeader
      title="Problem Settings"
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>

      {displayProblems}
      <RaisedButton label='Add Problem' onClick={() => {this.addProblem()}} primary={true} />
    </CardText>
  </Card>


    <br />


      <RaisedButton label='Create Assignment' onClick={() => {this.props.submitForm(this.state, this.props.params.course)}} primary={true} />
      </div>
    );
  }
}


CreateAssignment.contextTypes = {
  router: React.PropTypes.object.isRequired
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    assignmentsData: state.assignments.assignmentsData,
    errorObject: state.create.errorObject,
    redirect: state.create.redirect,
    perms: state.app.perms,
    admin: state.app.admin,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    submitForm: submitForm
  }, dispatch);
}

function getEditableState(state){
  return ({

      displayName: state.displayName,
      startDate: state.startDate,
      dueDate: state.dueDate,
      endDate: state.endDate,
      startTime: state.startTime,
      dueTime: state.dueTime,
      endTime: state.endTime,
      category: state.category,
      name: state.name,
      problems: state.problems,
      num_probs: state.num_probs,
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAssignment);
