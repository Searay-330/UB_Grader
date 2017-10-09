import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import blueA700 from 'material-ui/styles/colors';

export function Course(props) {
    console.log(this);
    var title = <h1>{props.displayName}</h1>;
    return (
        <Card>
            <CardTitle>{title}</CardTitle>
            <CardText>Semester: {props.semester}</CardText>
            <CardActions>
                <RaisedButton label='Enter' primary={true} fullWidth={true} href={[this.location.pathname, props.courseNum, "assignments"].join('/')} />
            </CardActions>
        </Card>
    );
}

export default Course;