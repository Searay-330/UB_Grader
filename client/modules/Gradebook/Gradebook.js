import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getStudentGrades, getProfessorGrades, getCourseRoster } from './GradebookActions';

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

import styles from './Gradebook.css';

export class Gradebook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: false,
            submissions: {},
            role: "student",
            roster: [],
        }
    }

    componentDidMount() {
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

        if (role == "instructor") {
            this.props.getProfessorGrades(courseNum);
            this.props.getCourseRoster(courseNum);
        } else {
            this.props.getStudentGrades(courseNum, email);
        }
        this.setState({
            render: false,
            submissions: {},
            role: role,
            roster: [],
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            render: true,
            submissions: nextProps.submissions,
            role: this.state.role,
            roster: nextProps.roster,
        })
    }

    render() {
        if (!this.state.render) {
            return null;
        }

        return (
            <Card>
                <CardTitle title="Gradebook" />
                <CardMedia>
                    {
                        (this.state.role == "instructor")
                            ? this.instructorBook()
                            : this.studentBook()
                    }
                </CardMedia>
            </Card>
        );
    }

    sumGrades(scores) {
        if (scores.length == 0) {
            scores = '-';
        } else {
            var total = 0;
            scores = scores.forEach(function (element) {
                total += element.score;
            });
            scores = total;
        }
        return scores;
    }

    getStudentSubMap(submissions) {
        console.log(submissions)
        var studentSubMap = {};
        for (var i = 0; i < submissions.length; i++) {
            var submission = submissions[i];
            var subEmail = submission.user_email;
            if (studentSubMap[subEmail] == undefined) {
                studentSubMap[subEmail] = {};
            }
            studentSubMap[subEmail][submission.assignment_num] = submission;
        }
        return studentSubMap;
    }

    getStudentAllInfo(keyList, studentSubMap, roster) {
        const studentInfo = [];
        for (var i = 0; i < roster.length; i++) {
            var student = roster[i];
            var studentEmail = student.email;
            if (studentSubMap[studentEmail] == undefined) {
                studentSubMap[studentEmail] = {};
            }
            var submissions = studentSubMap[studentEmail];
            var studentGrades = [];
            for (var j = 0; j < keyList.length; j++) {
                var key = keyList[j];
                if (submissions[key] == undefined) {
                    submissions[key] = {
                        version: "-",
                        scores: "-",
                    }
                } else {
                    submissions[key].scores = this.sumGrades(submissions[key].scores);
                }
                studentGrades.push(<TableRowColumn width={50} key={studentEmail + key + "scores"}>{submissions[key].scores}</TableRowColumn>);
            }
            studentInfo.push({ student: student, grades: studentGrades })
        }
        return studentInfo;
    }

    instructorBook() {
        const assignments = [];
        const assignemtNames = Object.keys(this.props.assignmentsMapping);
        for (var i = 0; i < this.props.assignments.length; i++) {
            var key = assignemtNames[i];
            var assignment = this.props.assignmentsMapping[key];
            var colKey = assignment.name;
            assignments.push(<TableHeaderColumn width={50} key={colKey + "name"}><b>{colKey}</b></TableHeaderColumn>);
        }

        const studentSubMap = this.getStudentSubMap(this.state.submissions);

        const studentInfo = this.getStudentAllInfo(assignemtNames, studentSubMap, this.state.roster);

        return (
            <div className={styles.upper}>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn width={100}><b>Student</b></TableHeaderColumn>
                            {assignments}
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {studentInfo.map((submission, index) => (
                            <TableRow key={index} >
                                <TableRowColumn width={100}>{submission.student.first_name + " " + submission.student.last_name}</TableRowColumn>
                                {submission.grades}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }

    studentBook() {
        const data = [];

        for (var i = 0; i < this.state.submissions.length; i++) {
            var sub = this.state.submissions[i];
            sub.scores = this.sumGrades(sub.scores);
            data.push(sub);
        }
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

                    {data.map((submission, index) => (
                        <TableRow key={index} >
                            <TableRowColumn>{this.props.assignmentsMapping[submission.assignment_num].name}</TableRowColumn>
                            <TableRowColumn>{submission.version}</TableRowColumn>
                            <TableRowColumn>{submission.scores}</TableRowColumn>
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
        roster: state.gradebook.roster,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getStudentGrades: getStudentGrades,
        getProfessorGrades: getProfessorGrades,
        getCourseRoster: getCourseRoster,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Gradebook);