import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Course.css';

import { Button, Panel, ListGroup } from 'react-bootstrap';

export class Course extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
        };
    }

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    render() {
        const title = <h1>{this.props.displayName}</h1>;
        return (
            <Panel header={title} bsStyle={["default",styles['panel_custom']].join(' ')} eventKey='1'>
                <ListGroup>Semester: {this.props.semester}</ListGroup>
                <center><Button bsSize="large" bsStyle="primary" href={[this.props.location, this.props.courseNum, "assignments"].join('/')}>Enter</Button></center>
            </Panel>
        );
    }
}

function mapStateToProps(state) {
    return {
        semester: state.course.semester,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);