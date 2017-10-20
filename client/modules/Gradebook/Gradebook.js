import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getStudentGrades, getProfessorGrades } from './GradebookActions';

import { Card, CardMedia, CardTitle } from 'material-ui/Card';

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export class Gradebook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: false,
            submissions: {},
        }
    }

    componentDidMount() {
        var courseNum = this.props.params.course;
        var email = this.props.user.email;

        this.props.getStudentGrades(courseNum, email);
        this.setState({
            render: false,
            submissions: {},
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            render: true,
            submissions: nextProps.submissions
        })
    }

    render() {
        if (!this.state.render) {
            return null;
        }
        console.log(this.state.submissions);
        const columns = [
            {
                Header: "Assignment",
                accessor: "assignment_num"
            },
            {
                Header: "Version",
                accessor: "version"
            },
        ]

        const data = [];

        for (var i = 0; i < this.state.submissions.length; i++) {
            var sub = this.state.submissions[i];
            if (sub.scores == undefined) {
                sub.scores = '-';
            } else {
                sub.scores = sub.scores.reduce((a, b) => a + b, 0);
            }
            data.push(sub);
        }

        console.log(data);
        return (
            <Card>
                <CardTitle title="Grades" />
                <CardMedia>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Assignment</TableHeaderColumn>
                                <TableHeaderColumn>Version</TableHeaderColumn>
                                <TableHeaderColumn>Score</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {data.map((n, index) => (
                                <TableRow key={index} >
                                    <TableRowColumn>{n.assignment_num}</TableRowColumn>
                                    <TableRowColumn>{n.version}</TableRowColumn>
                                    <TableRowColumn>{n.scores}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardMedia>
            </Card>
        );
    }

    instructorBook() {
    }

    studentBook() {

    }
}

function mapStateToProps(state) {
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
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Gradebook);