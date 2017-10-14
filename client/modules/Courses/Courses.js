import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {changeMenuItems} from '../App/AppActions';
import MenuItem from 'material-ui/MenuItem';
import Course from './modules/Course/Course';
import {getCourses} from './CoursesActions';
import { PanelGroup, Grid, Row } from 'react-bootstrap';
import RaisedButton from 'material-ui/FlatButton';

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

        var isAdmin = false;
        for(var i in this.props.perms){
            if(this.props.perms[i] == 'admin'){
                isAdmin = true;
                break;
            }
        }

        var create = null;
        if(isAdmin){
            create = <MenuItem onClick={()=>{window.location = "/courses/create"}}>Create Course</MenuItem>;
            this.props.changeMenuItems(create);
        } 
        var courses = [];
        for (var i = 0; i < this.state.courses.length; i++) {
            var course = this.state.courses[i];
            courses.push(
                <Course key={course['id']} courseNum={course['course_num']} displayName={course['display_name']} semester={course['semester']} location={this.props.location.pathname}/>
            );
        }
        return (
            <div>
            <br/>
            <br/>
            <PanelGroup>
                <Grid>
                    <Row>
                        {courses}
                    </Row>
                </Grid>
            </PanelGroup>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        courses: state.courses.coursesData,
        perms: state.app.perms,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCourses: getCourses,
        changeMenuItems: changeMenuItems,

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);