import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getStudentGrades, getProfessorGrades } from './GradebookActions';

import AssignmentGrade from './components/AssignmentGrade';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

import ReactTable from 'react-table';
import styles from 'react-table/react-table.css';

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
            data.push(this.state.submissions[i]);
        }

        const x = styles;

        console.log(data);
        return (
            <Card>
                <CardTitle title="Grades" />
                <CardMedia>
                    <div style={styles}>
                        <ReactTable
                            columns={columns}
                            data={data}
                        />
                    </div>
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