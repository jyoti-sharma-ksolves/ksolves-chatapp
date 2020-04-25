import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import ChatRoom from './views/ChatRoom';

class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <Router>
          <Switch>

            <Route exact path="/">
              <SignUp />
            </Route>

            <Route exact path="/sign-in">
              <SignIn />
            </Route>

            <Route exact path="/chatroom">
              <ChatRoom />
            </Route>

          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
