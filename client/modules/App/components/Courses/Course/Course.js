import React, {Component, PropTypes} from 'react';
import styles from './Course.css';

import { Button,Modal} from 'react-bootstrap';

export class Course extends Component {

    constructor(props) {
        super(props);
        this.state = {isMounted: false};
    }

    componentDidMount() {
        this.setState({isMounted: true});
    }

    render() {
        return (
            <Modal.Dialog>
                <Modal.Header bsClass={styles.header}>
                    <center><Modal.Title>{this.props.className}</Modal.Title></center>
                </Modal.Header>
                <Modal.Body>
                    {this.props.semester}
                </Modal.Body>
                <Modal.Footer>
                    <center><Button bsSize="large" bsStyle="primary" onClick={() => console.log("boop bop beep")}>Enter</Button></center>
                </Modal.Footer>
            </Modal.Dialog>
        );
    }
  }
  
  export default Course;