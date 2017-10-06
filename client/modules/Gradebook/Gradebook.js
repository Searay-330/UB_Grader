import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {getGrades} from './GradebookActions';

export class Gradebook extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (<p>A+</p>);
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Gradebook);