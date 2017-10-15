import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {chooseCourse} from './CourseActions';



import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';

export class Course extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
        };
    }

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    render() {
        const title = <h1>{this.props.displayName}</h1>;
        return (
            <Card>
                <CardTitle>{title}</CardTitle>
                <CardText>Semester: {this.props.semester}</CardText>
                <CardActions>
                    <RaisedButton label='Enter' primary={true} fullWidth={true} onClick={() => this.enterCourse()} />
                </CardActions>
            </Card>
        );
    }

    enterCourse() {
        this.props.chooseCourse(this.props);
        window.location = "courses/" + this.props.courseNum + "/assignments";
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        chooseCourse: chooseCourse,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);