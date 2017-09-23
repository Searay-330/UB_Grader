import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import styles from './Course.css';

import { Button, Panel } from 'react-bootstrap';

export class Course extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMounted: false
        };
    }

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    render() {
        return (
            <Panel header={this.props.displayName}>
                <div>{this.props.semester}</div>
                <center><Button bsSize="large" bsStyle="primary" href={[this.props.location, this.props.courseNum, "assignments"].join('/')}>Enter</Button></center>
            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {
        courseNum: state.course.courseNum,
        displayName: state.course.displayName,
        semester: state.assignment.semester,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);