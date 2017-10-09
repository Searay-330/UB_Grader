import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getStudentGrades, getProfessorGrades, getUserInfo } from './GradebookActions';

import AssignmentGrade from './components/AssignmentGrade';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import { PanelGroup, Grid, Row, Col } from 'react-bootstrap';

export class Gradebook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: false,
            userData: {},
            submissions: {},
        }
    }

    componentDidMount() {
        this.setState({
            render: false,
            userData: {},
            submissions: {},
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log("NEXT PROPS");
        console.log(nextProps);
        var courseNum = nextProps.params.course;
        var email = nextProps.user.email;
        console.log(nextProps.assignments);
        for (var assignment in nextProps.assignments) {
            var assignmentNum = nextProps.assignments[assignment].assignment_num;
            console.log("Getting: " + courseNum + " " + assignmentNum + " " + email)
            this.props.getStudentGrades(courseNum, assignmentNum, email).then(() => { this.forceUpdate() });
        }
        // console.log(this.props.submissions);
    }

    render() {

        // console.log(this.props);
        return (
            this.studentBook()
        );
    }

    instructorBook() {
        return (
            <Card>
                <CardTitle title="Grades" />
                <CardMedia>
                    <Table>
                        <TableHeader>

                        </TableHeader>
                        <TableBody>

                        </TableBody>
                    </Table>
                </CardMedia>
            </Card>
        )
    }

    studentBook() {
        console.log(Object.keys(this.props.submissions));
        if (Object.keys(this.props.submissions) == 1) {
            return null;
        }
        this.rows = [];
        console.log(this.props);
        for (var assignment in this.props.assignments) {
            console.log(this.props.submissions);
            console.log(this.props.assignments[assignment].assignment_num);
            var key = this.props.assignments[assignment].assignment_num;
            var data = this.props.submissions[key];
            if (data == undefined) {
                continue;
            }
            console.log(data);
            this.rows.push(<AssignmentGrade data={data} />);
        }
        console.log(this.rows);
        return (
            <Card>
                <CardTitle title="Grades" />
                <CardMedia>
                        <table style="width:100%">
                            <tr>
                                <th>Assignment</th>
                                <th>Score</th>
                                <th>Version</th>
                            </tr>
                            {this.rows}
                        </table>
                </CardMedia>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state);
    return {
        user: state.app.user,
        assignments: state.assignments.assignmentsData,
        submissions: state.gradebook.submissions,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getStudentGrades: getStudentGrades,
        getProfessorGrades: getProfessorGrades,
        getUserInfo: getUserInfo,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Gradebook);