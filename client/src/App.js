import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import ChatRoom from './views/ChatRoom';
import PrivateRoute from './views/PrivateRoute';

class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <Router>
          <Switch>

            <PrivateRoute exact path="/" component={SignUp} />

            <PrivateRoute exact path="/sign-in" component={SignIn} />

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
