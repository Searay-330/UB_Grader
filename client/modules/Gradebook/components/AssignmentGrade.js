import React, { PropTypes } from 'react';
import { Link } from 'react-router';


import { PanelGroup, Grid, Row, Col} from 'react-bootstrap';

export function AssignmentGrade(data) {
    console.log(data);
    var info = data.data;
    return (
        <tr key={0} selectable={false} displayRowCheckbox={false}>
            <td>{info.version}</td>
            <td>{info.version}</td>
            <td>{(info.scores.length == 0) ? "Waiting for feedback" : data.scores.reduce((a, b) => Number(a) + Number(b), 0)}</td>
        </tr>
    );
}


export default AssignmentGrade;
