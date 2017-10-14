import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Import Actions
import { getCourseData } from './AssignmentsActions'
import {redirectReset} from './components/CreateAssignment/CreateAssignmentActions';
import RaisedButton from 'material-ui/FlatButton';
import {changeMenuItems} from '../App/AppActions';

// Import Components
import Category from './modules/Category/Category';
// Import Material
import { GridList } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';

export class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = { render: false, categories: [], drawers: []};
    
  }

  componentDidMount() {
    this.props.getCourseData(this.props.params.course);
    this.setState({ render: false, categories: [], drawers: []});
  }

  componentWillReceiveProps(nextProps) {
    this.categories = [];
    this.drawers = [];
    for (var i = 0; i < nextProps.assignments.length; ++i) {
      if (this.categories[nextProps.assignments[i].category] == undefined) {
        this.categories[nextProps.assignments[i].category] = [];
        this.drawers[nextProps.assignments[i].category] = false;
      }
      this.categories[nextProps.assignments[i].category].push(nextProps.assignments[i]);
    }

    if(nextProps.perms){
    var create = null;
    var create2 = null;
    var gradebook = null;
    if(nextProps.perms[this.props.params.course] != "student"){
      create = <MenuItem key={0} onClick={()=>{window.location = "/courses/" + this.props.params.course + "/assignments/create"}}>Create Assignemnt</MenuItem>;
      create2 = <MenuItem key={1} onClick={() => { window.location = "/courses/" + this.props.params.course + "/adduser" }}>Add User To Course</MenuItem>;
    } 
    gradebook = <MenuItem key={2} onClick={() => { window.location = "/courses/" + this.props.params.course + "/assignments/gradebook"}}>Gradebook</MenuItem>;
    var elems = [create,create2, gradebook];
    nextProps.changeMenuItems(elems);
    }

    this.setState({ render: true, categories: this.categories, drawers: this.drawers});

  }

  updateDrawers = (drawerName, state)=>{
    var drawer = this.state.drawers;
    if(typeof state == "string"){
      drawer[drawerName] = !drawer[drawerName];
    }else{
      drawer[drawerName] = state;  
    }
    this.setState({ render: true, categories: this.state.categories, drawers: drawer});
  };



  render() {
    if(!this.props.perms){
      console.log(this.props.perms);
      return null;
    }
    var childComp = this.props.children;
    if (this.state.render && this.props.children) { return(<div>{childComp}</div>); }
    if(!this.state.render) {return null;}
    var cats = [];
    for (var key in this.state.categories) {
      cats.push(<Category nowOpen={this.drawers[this.state.categories[key][0].category]} update={this.updateDrawers} key={this.state.categories[key][0].category} name={this.state.categories[key][0].category} location={this.props.location.pathname} assignments={this.state.categories[key]} />);
    }
    if (this.props.redirected) {
      this.props.getCourseData(this.props.params.course);
      this.props.resetRedir();
    }



    return (
      <div>
        <GridList
          cols={3}
        >
          {cats}
        </GridList>
      </div>
    );
  }
}
 


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    assignments: state.assignments.assignmentsData,
    redirected: state.create.redirect,
    perms: state.app.perms,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCourseData: getCourseData,
    resetRedir: redirectReset,
    changeMenuItems: changeMenuItems,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);

