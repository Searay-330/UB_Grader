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
            role: "student",
        }
    }

    componentDidMount() {
        console.log(this.props);
        var courseNum = this.props.params.course;
        var email = this.props.user.email;

        var role = this.state.role;
        for (var i = 0; i < this.props.user.courses.length; i++) {
            var course = this.props.user.courses[i];
            if (course.course_num == this.props.params.course) {
                role = course.course_role;
                break;
            }
        }

        // if (role == "instructor") {
        //     this.props.getProfessorGrades(courseNum);
        // } else {
            this.props.getStudentGrades(courseNum, email);
        // }
        this.setState({
            render: false,
            submissions: {},
            role: role,
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            render: true,
            submissions: nextProps.submissions,
            role: this.state.role,
        })
    }

    render() {
        if (!this.state.render) {
            return null;
        }

        const data = [];

        for (var i = 0; i < this.state.submissions.length; i++) {
            var sub = this.state.submissions[i];
            if (sub.scores.length == 0) {
                sub.scores = '-';
            } else {
                var total = 0;
                sub.scores = sub.scores.forEach(function(element) {
          total += element.score;
        });
            sub.scores = total;
            }
            data.push(sub);
        }
        return (
            <Card>
                <CardTitle title="Grades" />
                <CardMedia>
                    {this.studentBook(data)}
                </CardMedia>
            </Card>
        );
    }

    instructorBook(data) {

    }

    studentBook(data) {
        return (
            <Table selectable={false}>
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
                            <TableRowColumn>{this.props.assignmentsMapping[n.assignment_num].name}</TableRowColumn>
                            <TableRowColumn>{n.version}</TableRowColumn>
                            <TableRowColumn>{n.scores}</TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        assignments: state.assignments.assignmentsData,
        assignmentsMapping: state.assignments.assignmentsMap,
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