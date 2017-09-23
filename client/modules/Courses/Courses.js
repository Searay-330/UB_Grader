import React, { Component, PropTypes } from 'react';
import {PanelGroup, Grid, Row} from 'react-bootstrap';

import styles from './Courses.css';
import Course from './modules/Course/Course';
import getCourses from './CoursesActions';

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
        this.setState = {render: false, courses: prevState.courses};
    }

    render() {
        // if (!this.state.render) {
        //     return null;
        // }
        // var courses = [];
        // for (var course in this.state.courses) {
        //     courses.push(<Course courseNum={course['course_num']} displayName={course['display_name']} semester={course['semester']}/>);
        // }

        return (
            <PanelGroup>
                <Grid>
                    <Row>
                        "TEST TEST"
                    </Row>
                </Grid>
            </PanelGroup>
        )
    }
}

function mapStateToProps(state) {
    courses: state.courses.coursesData
}

function mapDispatchToProps(state) {
    return bindActionCreators({
        getCourses: getCourses
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);