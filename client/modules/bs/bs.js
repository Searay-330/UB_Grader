import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Import Style
import styles from './Bs.css';


import { getRequest, postRequest} from './BsActions';

export class Bs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          <h1>{this.props.text}</h1>
          <button onClick={this.props.getr}> get request </button>
        </div>
        <div>
          <h1>{this.props.postText}</h1>
          <input type="text" value={this.state.value} onChange={(event) => {this.setState({inputValue: event.target.value});}}/>
          <button onClick={() => {this.props.postr(this.state.inputValue)}}> post request </button>
        </div>
      </div>
    );
  }
}



function mapStateToProps(state) {
 return {
    text: state.bs.text,
    postText: state.bs.postText
  };
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    getr: getRequest,
    postr: postRequest,
  }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(Bs);
