import React from 'react';
import styles from './Course.css';

import { Button,Modal} from 'react-bootstrap';

export function Course() {
    return (
        <Modal.Dialog>
            <Modal.Header bsClass={styles.header}>
                <center><Modal.Title>Course 1</Modal.Title></center>
            </Modal.Header>
            <Modal.Body>
                Assignments or some shit
            </Modal.Body>
            <Modal.Footer>
                <center><Button bsSize="large" bsStyle="primary" onClick={() => console.log("boop bop beep")}>Enter</Button></center>
            </Modal.Footer>
        </Modal.Dialog>
    );
  }
  
  export default Course;