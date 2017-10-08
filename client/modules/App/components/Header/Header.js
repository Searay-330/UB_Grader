import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './Header.css'

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';

import ToolbarGroup from 'material-ui/Toolbar';

export class Header extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    var icon = [];

    if (this.props.in_course) {
      var path = "/courses/cse442_f17/assignments/gradebook";
      icon.push(<FlatButton key='0' className={styles.button} label="Gradebook" href={path}/>);
    }
    if (this.props.user.first_name != "") {
      icon.push(<FlatButton key='1' className={styles.button} label={this.props.user.first_name} labelPosition="before" icon={<ActionExitToApp color='white'/>} href="/api/logout" />);
    }
    icon = (
      <ToolbarGroup className={styles.toolbar_group}>
        {icon}
      </ToolbarGroup>
    )
    var appBar = <AppBar showMenuIconButton={false} title="Autograder 3.0" iconElementRight={icon} />;
    return (
      <div>
        {appBar}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
      in_course: (typeof state.assignments.assignmentsData != 'undefined' && state.assignments.assignmentsData.length != 0),
      user: state.app.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
