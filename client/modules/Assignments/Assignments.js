import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Import Actions
import { getCourseData } from './AssignmentsActions'

// Import Components
import Category from './modules/Category/Category';
// Import Bootstrap
import { GridList } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

export class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = { render: false, categories: [] };
  }

  componentDidMount() {
    this.props.getCourseData(this.props.params.course);
    this.setState({ render: false, categories: [] });
  }

  componentWillReceiveProps(nextProps) {
    this.categories = [];
    for (var i = 0; i < nextProps.assignments.length; ++i) {
      if (this.categories[nextProps.assignments[i].category] == undefined) {
        this.categories[nextProps.assignments[i].category] = [];
      }
      this.categories[nextProps.assignments[i].category].push(nextProps.assignments[i]);
    }
    this.setState({ render: true, child: false, categories: this.categories });
    if(this.props.params.assignment != undefined){
      this.setState({ render: false, child: true, categories: this.categories });
    }
    // this.forceUpdate();

  }

  render() {
    var childComp = this.props.children;
    if (!this.state.render && this.state.child) { return(<div>{childComp}</div>); }
    if(!this.state.render && !this.state.child) {return null;}
    var cats = []
    var i = 0;
    for (var key in this.state.categories) {
      cats.push(<Category key={this.state.categories[key][0].category} name={this.state.categories[key][0].category} location={this.props.location.pathname} assignments={this.state.categories[key]} />);
    }
    // console.log(cats);
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCourseData: getCourseData,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);

