import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import { Grid, Row, Col, Button, Well, Form, FormGroup, FormControl, Checkbox, ControlLabel
} from 'react-bootstrap';;

import {LinkContainer} from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { registerUserRequest } from '../../UserActions';
import { browserHistory } from 'react-router';

class SignupWidget extends Component {

  constructor(props) {
    super(props);
    this.registerUser = this.registerUser.bind(this);
    this.handleFname = this.handleFname.bind(this);
    this.handleLname = this.handleLname.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleUname = this.handleUname.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      uname: '',
      password: ''
    }
  }


  handleFname(e) {
    console.log("value:", e.target.value);
    this.setState ({
      fname: e.target.value,
    })
  }

  handleLname(e) {
    console.log("value:", e.target.value);
    this.setState ({
      lname: e.target.value,
    })
  }

  handleEmail(e) {
    console.log("value:", e.target.value);
    this.setState ({
      email: e.target.value,
    })
  }

  handleUname(e) {
    console.log("value:", e.target.value);
    this.setState ({
      uname: e.target.value,
    })
  }

  handlePassword(e) {
    console.log("value:", e.target.value);
    this.setState ({
      password: e.target.value,
    })
  }

/*   getValidationState() {
    console.log(this.state.password.length)
    const length = this.state.password.length;
    if (length > 6) return 'success';
    else if (length > 3) return 'warning';
    else if (length > 0) return 'error';
  }*/

  registerUser = (e) => {
    e.preventDefault();
    const fnameRef = ReactDOM.findDOMNode(this.refs.fname).value;
    const lnameRef = ReactDOM.findDOMNode(this.refs.lname).value;
    const emailRef = ReactDOM.findDOMNode(this.refs.email).value;
    const unameRef = ReactDOM.findDOMNode(this.refs.uname).value;
    const passwordRef = ReactDOM.findDOMNode(this.refs.password).value;
    if (fnameRef && lnameRef && emailRef && unameRef && passwordRef) {
      this.props.dispatch(registerUserRequest({ fnameRef, lnameRef, emailRef, unameRef, passwordRef }));
    }

    /*if(this.props.isRegistered) {*/
    this.setState ({
      fname: '',
      lname: '',
      email: '',
      uname: '',
      password: ''
    });
    browserHistory.push('/signin');
    /*}*/
  };

  render() {
    console.log( "props: ", this.props);
    return (
      <Grid className="marginBottom">
        <Row>
          <h2 style={{ textAlign: 'center' }}>
            Sign Up
          </h2>
          <hr/>
          <Col md={3}/>
          <Col md={6}>
            <Well>
              <Form horizontal>
                <FormGroup controlId="formHorizontalFirstName">
                  <Col componentClass={ControlLabel} sm={2}>
                    First Name
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="First Name" value={this.state.fname} onChange={this.handleFname} ref="fname" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalLastName">
                  <Col componentClass={ControlLabel} sm={2}>
                    Last Name
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Last Name" value={this.state.lname} onChange={this.handleLname} ref="lname" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmail} ref="email" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalUserName">
                  <Col componentClass={ControlLabel} sm={2}>
                    UserName
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="User Name" value={this.state.uname} onChange={this.handleUname} ref="uname" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword" >
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword}  ref="password" />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit" onClick={this.registerUser}>
                      Sign Up
                    </Button>
                    &nbsp; or&nbsp;
                    <LinkContainer to="/signin">
                      <a>Signin</a>
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
  console.log(state.user);
  return {
    isRegistering : state.user.isRegistering,
    isRegistered : state.user.isRegistered,
    isRegisteredFailed : state.user.isRegisteredFailed,
  };
}

export default connect(mapStateToProps)(SignupWidget);


