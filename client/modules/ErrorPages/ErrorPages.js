import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import NotFound from './components/NotFound'



export class ErrorPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  componentWillReceiveProps(NextProps) {
    
  }

  render() {
    switch(this.props.route.error){

      case "404":
        return <NotFound />;
      break;

      default:
        return null;
      break;
    }  
  }
}

  
// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPages);

