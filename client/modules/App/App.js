import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
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
