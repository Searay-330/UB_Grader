import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Import Actions
// import {method} from './AssignmentActions'

// Import Style
// import styles from './Assignment.css';

// Import Components
import Category from './components/Category/Category';
// Import Bootstrap
import { Grid,Row,Col,PanelGroup, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';



export class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }


  render() {
    return (
     <PanelGroup>
      <Grid>
        <Row>
          <Category name={this.props.categories[0]}/>
          <Category name={this.props.categories[1]}/>
          <Category name={this.props.categories[2]}/>
        </Row>
      </Grid>
    </PanelGroup>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    categories: state.assignments.categories,
  };
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Assignments);

