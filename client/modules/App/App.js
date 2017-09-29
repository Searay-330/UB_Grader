import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blueA400, blueA700, white, black, darkBlack, fullBlack, grey200, grey500, grey600, grey700 } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

//Import Actions
import {getUserLoggedIn} from './AppActions'

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Home from './components/Home/Home';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueA700,
    primary2Color: blueA400,
    primary3Color: grey500,
    accent1Color: blueA400,
    accent2Color: grey600,
    accent3Color: black,
    textColor: black,
    alternateTextColor: white,
    canvasColor: grey500,
    borderColor: black,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: blueA700,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: darkBlack,
  },
});

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.props.checkUser();
    this.setState({isMounted: true}); // eslint-disable-line
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.first_name != "" && nextProps.location.pathname == "/"){
      this.context.router.push("/courses");
    }
  }


  render() {
    let home = null
    //if user is logged in then we will render the courses page once it is prepared.
    if(this.props.user.first_name == ""){
      if(this.props.location.pathname != "/"){
        this.context.router.push("/");
      }
      home = <Login />
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" /> */}
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools /> && false}
        <div>
          <Helmet
            title="Autograder 3.0"
            titleTemplate="%s"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header user={this.props.user.first_name}/>
          <div className={styles.container}>
          {home}

           {this.props.children}
         </div>
          <Footer />
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}


App.contextTypes = {
  router: React.PropTypes.object.isRequired
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    user: state.app.user,
    
  };
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    checkUser:getUserLoggedIn,
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
