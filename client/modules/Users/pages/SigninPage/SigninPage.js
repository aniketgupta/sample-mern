import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import {
  Grid,
  Row,
  Col,
  Button,
  Well,
  Input, Form, FormGroup, FormControl, Checkbox, ControlLabel
} from 'react-bootstrap';;

import {LinkContainer} from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { loginUserRequest, storeEmail, storePassword, clearError } from '../../UserActions';
import { browserHistory } from 'react-router';

class SigninWidget extends Component {

  constructor(props) {
    super(props);
    this.loginUser = this.loginUser.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    /*this.resetForm = this.resetForm.bind(this);*/
    /*this.state = {
      email: '',
      password: ''
    }*/
  }

  handleEmail(e) {
    console.log("email:", e.target.value);
    /*this.setState ({
      email: e.target.value,
    })*/
    this.props.dispatch(clearError());
    this.props.dispatch(storeEmail( e.target.value ));
  }

  handlePassword(e) {
    console.log("value:", e.target.value);
    /*this.setState ({
      password: e.target.value,
    })*/
    this.props.dispatch(clearError());
    this.props.dispatch(storePassword( e.target.value ));
  }

  loginUser(e) {
    e.preventDefault();
    const emailRef = ReactDOM.findDOMNode(this.refs.email).value;
    const passwordRef = ReactDOM.findDOMNode(this.refs.password).value;
    if (emailRef && passwordRef) {
      this.props.dispatch(loginUserRequest({ emailRef, passwordRef }));
    }

    /*if(this.props.isRegistered) {*/
    /*this.setState ({
      email: '',
      password: ''
    });*/
    /*browserHistory.push('/');*/
    /*}*/
  };


  render() {
    if(this.props.isLoginFailed && this.props.errorMessage) {
      alert(this.props.errorMessage);
    }
    return (
      <Grid>
        <Row>
          <h2 style={{ textAlign: 'center' }}>Sign In</h2>
          <hr/><Col md={3}/>
          <Col md={6}>
            <Well>
              <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email" value={this.props.user.email} onChange={this.handleEmail} ref="email" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" value={this.props.user.password} onChange={this.handlePassword} ref="password" />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Checkbox>Remember me</Checkbox>
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit" onClick={this.loginUser}>
                      Sign in
                    </Button>
                    &nbsp; or&nbsp;
                    <LinkContainer to="/signup">
                      <a>Sign up</a>
                    </LinkContainer>
                  </Col>
                </FormGroup>
              </Form>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  console.log("state:", state.login);
  return {
    isLoggingIn : state.login.isLoggingIn,
    isLoggedIn : state.login.isLoggedIn,
    isLoginFailed : state.login.isLoginFailed,
    errorMessage : state.login.errorMessage,
    user: {
      email : state.login.user.email,
      password : state.login.user.password
    }
  };
}

export default connect(mapStateToProps)(SigninWidget);


