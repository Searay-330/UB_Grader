import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCourseData } from './../Assignments/AssignmentsActions';
import {getGrades} from './GradebookActions';

export class Gradebook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: false,
            assignments: [],
        }
    }

    componentDidMount() {
        console.log(this.props);
        this.props.getCourseData(this.props.params.course);
        this.setState({
            render:false,
            assignments: [],
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log("NEXT PROPS");
        console.log(nextProps);
    }

    render() {
        return (<p>A+</p>);
    }
}

function mapStateToProps(state) {
    return {
        // assignments: state.assignments.assignmentData,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCourseData: getCourseData,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Gradebook);