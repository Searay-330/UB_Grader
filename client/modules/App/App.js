import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Import Actions
import {userSwap} from './AppActions'

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
    this.setState({isMounted: true}); // eslint-disable-line
  }


  render() {
    let home = null
    if(this.props.user == ""){
      home = <Login changeFunc={this.props.changeUser} />
    }else{
      home = <Home/>
    }
    return (
      <div>
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
          <Header user={this.props.user}/>
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

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    user: state.app.user,
    
  };
}

function mapDispatchToProps(dispatch) {  
  return bindActionCreators({
    changeUser:userSwap,
  }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
