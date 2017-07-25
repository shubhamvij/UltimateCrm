import React, {Component, PropTypes} from 'react';
import themeable from 'react-themeable';

import TabbedArea from './components/TabbedArea';
import TabPane from './components/TabPane';
import Login from './components/Login';
import Forgot from './components/Forgot';
import Create from './components/Create';

const defaultTheme = {
  dialog: {
    backgroundColor: '#fff',
    width: '320px',
    margin: '3em auto',
    boxShadow: '0px 1px 8px #BEBEBE'
  },
  textBox: {
    boxSizing: 'border-box',
    display: 'block',
    margin: '15px 0px',
    width: '100%',
    padding: '6px 12px',
    color: '#555',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    lineHeight: '1.5',
    fontSize: '14px'
  },
  button: {
    width: '100%',
    color: '#fff',
    backgroundColor: '#428bca',
    borderColor: '#357ebd',
    borderRadius: '4px',
    border: '1px solid transparent',
    display: 'inline-block',
    marginBottom: '0',
    fontWeight: '400',
    lineHeight: '1.5',
    textAlign: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    padding: '6px 12px',
    fontSize: '14px'
  },
  helpText: {
    marginTop: '15px',
    paddingBottom: '10px',
    textAlign: 'center'
  },
  link: {
    color: '#428bca',
    textDecoration: 'none'
  }
};

class LoginView extends Component {

  static propTypes = {
    termsUrl: PropTypes.string,
    defaultTab: PropTypes.string,
    createAction: PropTypes.func,
    forgotAction: PropTypes.func,
    createExtras: PropTypes.object
  }
  static defaultProps = { defaultTab: 'login' };
  state = {
    defaultTab: this.props.defaultTab,
    forgotEnabled: this.props.defaultTab === 'forgot',
    errorMessage: null
  };

  constructor(props) {
    super(props);
    this.switchForgot = this.switchForgot.bind(this);
    this.setErrorMessage = this.setErrorMessage.bind(this);
    this.indexChanged = this.indexChanged.bind(this);
    this.loginAction = this.loginAction.bind(this);

  }

  loginAction(username, password) {
      
    console.log(username);
    console.log(password);
      
      if (password === "api") {
        fetch(`http://rectum.herokuapp.com/api/employees/`)
        .then(result=>result.json())
        .then(employees=>{
            for (var i = 0; i < employees.length; i ++){
                if (username === employees[i].username){
                    this.props.authenticateCallback(true);
                }
            } 
         })      
      }
      
      
//      fetch('http://rectum.herokuapp.com/api/employees', {
//          method: 'POST',
//          headers: {
//            'Accept': 'application/json',
//            'Content-Type': 'application/json',
//          },
//          body: JSON.stringify({
//            "username": username,
//	         "password": password 
//          })
//        }).then(result=>result.json())
//          .then(value=>{
//            console.log("Returned from Call");
//            console.log(value);
//            if(value) {
//                this.props.authenticateCallback(true);
//            }
//          })

  }

  setErrorMessage(errorMessage) {
    this.setState({errorMessage: errorMessage});
  }

  nameToIndex(state) {
    const si = {
      'login': 0,
      'create': 1,
      'forgot': 2
    };
    return si[state];
  }

  switchForgot(event) {
    event.preventDefault();
    this.setState({forgotEnabled: true});
    this.refs.tabbedArea.setIndex(this.nameToIndex('forgot'));
  }

  indexChanged() {
    // If tab index changes, forget the error message we were showing.
    this.setState({errorMessage: null});
  }

  renderForgot(themeStyle) {
    if (this.state.forgotEnabled) {
      return (
        <TabPane display="Forgot" theme={themeStyle}>
          <Forgot
            errorMessage={this.state.errorMessage}
            forgotAction={this.props.forgotAction}
            theme={themeStyle}
          />
        </TabPane>
      );
    }
    return null;
  }

  render() {
    const tabIndex = this.nameToIndex(this.state.defaultTab);
    const themeStyle = {...defaultTheme, ...this.props.theme};
    const theme = themeable(themeStyle);
    return (
      <div {...theme(1, 'dialog')}>
        <TabbedArea ref="tabbedArea" defaultIndex={tabIndex} indexChanged={this.indexChanged} theme={themeStyle}>
          <TabPane display="Login" theme={themeStyle}>
            <Login
              errorMessage={this.state.errorMessage}
              loginAction={this.loginAction}
              switchForgot={this.switchForgot}
              theme={themeStyle}
            />
          </TabPane>
          <TabPane display="Sign Up" theme={themeStyle}>
            <Create
              errorMessage={this.state.errorMessage}
              termsUrl={this.props.termsUrl}
              createAction={this.props.createAction}
              createExtras={this.props.createExtras}
              theme={themeStyle}
            />
          </TabPane>
          {this.renderForgot(themeStyle)}
        </TabbedArea>
      </div>
    );
  }

}

export default LoginView;
