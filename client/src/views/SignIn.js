import React from 'react';
import '../App.css';
import { withRouter } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

class SignIn extends React.Component {
    constructor() {
        super();
    
        this.state = {
          user: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          },
          result: {},
          errors: {},
        };
    }
    
    onChange = (e) => {
        console.log(e.target.name, 'aaaa')
        const fieldName = e.target.name;
        const user = this.state.user;

        user[fieldName] = e.target.value;

        this.setState({ user });
    }

    onPwChange = (e) => {
        console.log(e.target.value, 'bbbb');
        const fieldName = e.target.name;
        const user = this.state.user;

        user[fieldName] = e.target.value;
        
        this.setState({ user });
    }

    onSubmit = async(e) => {
        e.preventDefault();

        const { email, password } = this.state.user;
        // const { result } = this.state;
        const url = 'http://localhost:8000/api/sign-in';

        await fetch( url, {
            headers: {
              'content-type': 'application/json',
              accept: 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ 
                email,
                password,
            }),
        })
        .then(response => response.json())
        .then(jsonData => {
          if(jsonData && jsonData.accessToken) {
            this.setState({ result: jsonData.result });

            localStorage.setItem('document', JSON.stringify(this.state.result));
            this.props.history.push('/chatroom');
          }
        })
        .catch(error => {
            console.error(error);
        })
    }
    
    render() {
        const {
            email,
            password
        } = this.state.user;
        const { errors } = this.state;

        return (
            <div className="loginBox">
              <h1>Sign In</h1>
              {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
        
              <form onSubmit={this.onSubmit}>
                <TextField
                  name="email"
                  floatingLabelText="email"
                  value={email}
                  onChange={this.onChange}
                  errorText={errors.email}
                />
                <TextField
                  type="password"
                  name="password"
                  floatingLabelText="password"
                  value={password}
                  onChange={this.onPwChange}
                  errorText={errors.password}
                />
                <br />
                <RaisedButton
                  className="signUpSubmit"
                  primary={true}
                  type="submit"
                  label="submit"
                />
              </form>
              <p>
                Don't have an account? <br />
                <a href="/">Create here</a>
              </p>
            </div>
        );
    }
}

  
export default withRouter (SignIn);