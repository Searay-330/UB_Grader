import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {changeMenuItems} from '../App/AppActions';
import MenuItem from 'material-ui/MenuItem';
import Course from './modules/Course/Course';
import {getCourses} from './CoursesActions';
import { PanelGroup, Grid, Row } from 'react-bootstrap';
import RaisedButton from 'material-ui/FlatButton';
import { GridList } from 'material-ui/GridList';

export class Courses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rendered: false,
        };
    }

    componentDidMount() {
        this.props.getCourses();
        this.setState({
            render: false,
        });
    }

    componentWillReceiveProps(nextProps) {
        this.courses = nextProps.courses;
        
        var isAdmin = false;
        for(var i in nextProps.perms){
            if(nextProps.perms[i] == 'admin'){
                isAdmin = true;
                break;
            }
        }

        var create = null;
        if(isAdmin){
            create = <MenuItem onClick={()=>{window.location = "/courses/create"}}>Create Course</MenuItem>;
            this.props.changeMenuItems(create);
        } 

        this.setState({
            render: true,
        });
    }

    render() {
        var childComp = this.props.children;
        if (this.state.render && this.props.children) { return(<div>{childComp}</div>); }
        if (!this.state.render) {
            return null;
        }

        var courses = [];
        for (var i = 0; i < this.props.courses.length; i++) {
            var course = this.props.courses[i];
            courses.push(
                <Course key={course['id']} courseNum={course['course_num']} displayName={course['display_name']} semester={course['semester']}/>
            );
        }
        return (
            <div>
                <br />
                <br />
                <GridList cols={3} cellHeight={300}>
                    {courses}
                </GridList>
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