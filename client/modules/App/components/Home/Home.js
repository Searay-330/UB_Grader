import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class Home extends Component {
  constructor() {
    super();
  }



  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}



function mapStateToProps(state) {
 return {
   
  };
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
  }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);
