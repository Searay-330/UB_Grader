import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCourseData } from './../Assignments/AssignmentsActions';
import { getGrades } from './GradebookActions';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import {
    Table,
    TableBody,
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
            assignments: [],
        }
    }

    componentDidMount() {
        console.log(this.props);
        this.props.getCourseData(this.props.params.course);
        this.setState({
            render: false,
            assignments: [],
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log("NEXT PROPS");
        console.log(nextProps);
    }

    render() {
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
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        assignments: state.assignments.assignmentsData,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCourseData: getCourseData,
        getGrades: getGrades,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Gradebook);