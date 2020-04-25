import React from 'react';
import { withRouter } from "react-router-dom";
import '../App.css';
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

class SignUp extends React.Component {
    constructor() {
        super();
    
        this.state = {
          user: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            pwconfirm: '',
          },
          errors: {},
        };
    }
    
    onChange = (e) => {
        console.log(e.target.name, 'aaaa')
        const fieldName = e.target.name;
        const user = this.state.user;

        user[fieldName] = e.target.value;

        this.setState({ user });
        if (fieldName === 'email') {
          this.emailCheck(e.target.value);
        }

        if (fieldName === 'pwconfirm') {
          const message = 'Password mismatch';
          return this.state.user.password === e.target.value ?
          this.setState({ errors: { pwconfirm: ''} }) : this.setState({ errors: { pwconfirm: message} }); ;
        }
    }

    onPwChange = (e) => {
        console.log(e.target.value, 'bbbb');
        const fieldName = e.target.name;
        const user = this.state.user;

        user[fieldName] = e.target.value;

        this.setState({ user });
        
        this.passwordCheck(e.target.value);
    }

    passwordCheck = (password) => {
      const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*])\S{8,15}$/;
      const message = 'Password must contain minimum 8 characters including numeric, uppercase, lowercase and special characters(!,@,#,$,%,&,*).';

      return password.match(regex) ? 
      this.setState({ errors: { password: ''} }) : this.setState({ errors: { password: message} });
    }

    emailCheck = (email) => {
      const regex = /^\S+@\S+\.\S{2,4}$/;
      const message = 'Invalid email';

      return email.match(regex) ? 
      this.setState({ errors: { email: ''} }) : this.setState({ errors: { email: message} });
    }

    onSubmit = async(e) => {
        e.preventDefault();
        const { errors } = this.state;
        if (errors.email && errors.password && errors.firstName && errors.lastName && errors.pwconfirm) return ;

        const { firstName, lastName, email, password } = this.state.user
        const url = 'http://localhost:8000/api/sign-up';

        await fetch( url, {
            headers: {
              'content-type': 'application/json',
              accept: 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({ 
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            }),
        })
        .then(response => response.json())
        .then(jsonData => {
          if (jsonData.message === 'Account created') {
            this.props.history.push('/sign-in');
          }
          else if (jsonData.message === 'Email already in use.')
            this.setState({message: 'Email already in use.'})
        })
        .catch(error => {
            console.error(error);
        })    
    }
    
    render() {
        const {
            firstName,
            lastName,
            email,
            password,
            pwconfirm
        } = this.state.user;
        const { errors } = this.state;

        return (
            <div className="loginBox">
              <h1>Sign Up</h1>
              {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
        
              <form onSubmit={this.onSubmit}>
                <TextField
                  name="firstName"
                  floatingLabelText="first name"
                  value={firstName}
                  onChange={this.onChange}
                  errorText={errors.username}
                />
                <TextField
                  name="lastName"
                  floatingLabelText="last name"
                  value={lastName}
                  onChange={this.onChange}
                  errorText={errors.username}
                />
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
                <TextField
                  type="password"
                  name="pwconfirm"
                  floatingLabelText="confirm password"
                  value={pwconfirm}
                  onChange={this.onChange}
                  errorText={errors.pwconfirm}
                />
                <br />
                <RaisedButton
                  className="signUpSubmit"
                  primary={true}
                  type="submit"
                  label="submit"
                />
              </form>
              {this.state.message && <p style={{ color: "red" }}>{this.state.message}</p>}
              <p>
                Aleady have an account? <br />
                <a href="/sign-in">Log in here</a>
              </p>
            </div>
        );
    }
}

  
export default withRouter (SignUp);