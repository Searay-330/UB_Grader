import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Import Actions
// import {method} from './AssignmentActions'

// Import Style
//import styles from './Assignment.css';

// Import Components
// import Category from './componets/Category/Category';
import ScoreLine from './componets/ScoreLine/ScoreLine';
// Import Bootstrap
import {Button} from 'react-bootstrap';



export class Assignment extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }


  render() {
    return (
    
      <center>
      <div>
        <h1>{this.props.params.assignment}</h1>
        <h3>Due: June 9th 1917, 4:20pm</h3>
        <ScoreLine/>
        <br/>
        <Button bsStyle="primary">Submit</Button>
      </div>
      </center>
   
   
     /*<PanelGroup>
      <Grid>
        <Row>
           <Category name={this.props.categories[0]}/>
           <Category name={this.props.categories[1]}/>
           <Category name={this.props.categories[2]}/>
         </Row>
      </Grid>
      
    </PanelGroup>*/
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    categories: state.assignment.categories,
  };
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Assignment);

