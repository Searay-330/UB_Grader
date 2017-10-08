import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Import Actions
import { getCourseData } from './AssignmentsActions'
import {redirectReset} from './components/CreateAssignment/CreateAssignmentActions';
import RaisedButton from 'material-ui/FlatButton';

// Import Components
import Category from './modules/Category/Category';
// Import Bootstrap
import { GridList } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

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
    var childComp = this.props.children;
    if (this.state.render && this.props.children) { return(<div>{childComp}</div>); }
    if(!this.state.render) {return null;}
    var cats = [];
    for (var key in this.state.categories) {
      cats.push(<Category nowOpen={this.drawers[this.state.categories[key][0].category]} update={this.updateDrawers} key={this.state.categories[key][0].category} name={this.state.categories[key][0].category} location={this.props.location.pathname} assignments={this.state.categories[key]} />);
    }
    if(this.props.redirected){
      this.props.getCourseData(this.props.params.course);
      this.props.resetRedir();
    }
    var create = null;
    var create2 = null;
    if(this.props.perms[this.props.params.course] != "student"){
      create = <RaisedButton labelStyle={{color:"white"}} backgroundColor="#005BBB" label="Create Assignment" onClick={()=>{window.location = (window.location.toString().charAt(window.location.toString().length - 1) != "/") ? window.location + "/create" : window.location.toString().substring(-1) + "create"}} />;
      create2 = <RaisedButton 
                  labelStyle={{color:"white"}} 
                  backgroundColor="#005BBB" 
                  label="Add Students" 
                  onClick={()=>{window.location = /courses/ + this.props.params.course + "/adduser"}} />;
    } 
    
    return (
      <div>
        {create}
        <br/>
        <br/>
        {create2}
        <br />
        <br />
        <br />
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);

