import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import blueA700 from 'material-ui/styles/colors';

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
                    <RaisedButton label='Enter' primary={true} fullWidth={true} href={"/courses/" + this.props.courseNum + "/assignments"} />
                </CardActions>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        semester: state.course.semester,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);