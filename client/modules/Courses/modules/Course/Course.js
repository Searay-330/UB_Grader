import React, { Component, PropTypes } from 'react';
import styles from './Course.css';

import { Button, Modal } from 'react-bootstrap';

export class Course extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
            isActive: true
        };
    }

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    render() {
        return (
            <Modal.Dialog>
                <Modal.Header bsClass={styles.header}>
                    <center><Modal.Title>{this.props.displayName}</Modal.Title></center>
                </Modal.Header>
                <Modal.Body>
                    {this.props.semester}
                </Modal.Body>
                <Modal.Footer>
                    <center><Button bsSize="large" bsStyle="primary" href={[this.location, this.props.courseNum].join('/')}>Enter</Button></center>
                </Modal.Footer>
            </Modal.Dialog>
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