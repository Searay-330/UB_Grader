import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PanelGroup, Grid, Row } from 'react-bootstrap';

import Course from './modules/Course/Course';
import {getCourses} from './CoursesActions';

export class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rendered: false,
            courses: []
        };
    }

    componentDidMount() {
        this.props.getCourses();
        this.setState({
            render: false,
            courses: [],
        });
    }

    componentWillReceiveProps(nextProps) {
        this.courses = nextProps.courses;
        this.setState({
            render: true,
            courses: this.courses,
        });
    }

    render() {
        if (!this.state.render) {
            return null;
        }
        var courses = [];
        for (var i = 0; i < this.state.courses.length; i++) {
            var course = this.state.courses[i];
            courses.push(
                <Course key={course['id']} courseNum={course['course_num']} displayName={course['display_name']} semester={course['semester']} location={this.props.location.pathname}/>
            );
        }
        return (
            <PanelGroup>
                <Grid>
                    <Row>
                        {courses}
                    </Row>
                </Grid>
            </PanelGroup>
        )
    }
}

function mapStateToProps(state) {
    return {
        courses: state.courses.coursesData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCourses: getCourses,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);