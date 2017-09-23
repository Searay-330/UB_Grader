import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Import Actions
import {getCourseData} from './AssignmentsActions'

// Import Style
// import styles from './Assignment.css';

// Import Components
import Category from './modules/Category/Category';
// Import Bootstrap
import { Grid,Row,Col,PanelGroup, ListGroup, ListGroupItem} from 'react-bootstrap';



export class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = {render:false ,categories:[]};
  }

  componentDidMount() {
    this.props.getCourseData(this.props.params.course);
    this.setState({render: false,categories: []});
  }

  componentWillReceiveProps(nextProps){
      this.categories = [];
      for(var i = 0; i < nextProps.assignments.length; ++i){
        if(this.categories[nextProps.assignments[i].category] == undefined){
          this.categories[nextProps.assignments[i].category] = [];
        }
        this.categories[nextProps.assignments[i].category].push(nextProps.assignments[i]);
      }
      this.setState({render: true, categories:this.categories});
      // this.forceUpdate();

  }



  render() {

    if(!this.state.render){return null;}
    var cats = []
    for(var key in this.state.categories){
  
      cats.push(<Category key={this.state.categories[key][0].category} name={this.state.categories[key][0].category} location={this.props.location.pathname} assignments={this.state.categories[key]}/>);
    }
    // console.log(cats);
    return (
     <PanelGroup>
      <Grid>
        <Row>
        {cats}
        </Row>
      </Grid>
    </PanelGroup>
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
    getCourseData:getCourseData,
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Assignments);

