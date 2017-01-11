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
    this.validFirstName = false;
    this.validFnameStatus = false;
    this.validLastName = false;
    this.validLnameStatus = false;
    this.validEmail = false;
    this.validEmailStatus = false;
    this.validUserName = false;
    this.validPassword = false;
    this.validPasswordInput = false;
    this.state = {
      fname: '',
      lname: '',
      email: '',
      uname: '',
      password: '',
      showResults: true 
    }
  }

  validateFname(fname) {
    var re = /^[A-z]+$/;
    return re.test(fname);
  }

  handleFname(e) {
    console.log("value:", e.target.value);
    this.validFirstName = e.target.value !== '' ? true : false;
    /*if(!this.validFirstName) {
      console.log("in");
      this.refs.roomLicenseError.removeClass("hidden");
      this.setState ({
      showResults: false 
    })
    }*/
    this.validFnameStatus = this.validateFname(e.target.value);
    this.setState ({
      fname: e.target.value,
    })
  }

  validateLname(lname) {
    var re = /^[A-z]+$/;
    return re.test(lname);
  }

  handleLname(e) {
    console.log("value:", e.target.value);
    this.validLastName = e.target.value !== '' ? true : false;
    this.validLnameStatus = this.validateLname(e.target.value);
    this.setState ({
      lname: e.target.value,
    })
  }

  validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  handleEmail(e) {
    console.log("value:", e.target.value);
    this.validEmail = e.target.value !== '' ? true : false;
    this.validEmailStatus = this.validateEmail(e.target.value);
    this.setState ({
      email: e.target.value,
    })
  }

  handleUname(e) {
    console.log("value:", e.target.value);
    this.validUserName = e.target.value !== '' ? true : false;
    this.setState ({
      uname: e.target.value,
    })
  }

  handlePassword(e) {
    console.log("value:", e.target.value);
    this.validPassword = e.target.value !== '' ? true : false;

    if (e.target.value.length < 6) {
      this.validPasswordInput = false;

    } else {
      this.validPasswordInput = true;
    }

    this.setState ({
      password: e.target.value,
    })
  }

  getValidationState() {
    const length = this.state.fname.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

/*   getValidationState() {
    console.log(this.state.password.length)
    const length = this.state.password.length;
    if (length > 6) return 'success';
    else if (length > 3) return 'warning';
    else if (length > 0) return 'error';
  }*/

  /*handleKeyPress(target) {
    console.log(target)
    var keyCode = target.keyCode || target.which
    if(keyCode == 9){
      console.log("press1")
      if (!this.validFirstName) {
      alert("Please Input the First Name")
      ReactDOM.findDOMNode(this.refs.fname).focus();
    } 
    }

}
*/
  registerUser = (e) => {
    e.preventDefault();
    if (!this.validFirstName) {
      alert("Please Input the First Name")
      ReactDOM.findDOMNode(this.refs.fname).focus();
    } else if (!this.validFnameStatus) {
      alert("First Name must contain only letters")
      ReactDOM.findDOMNode(this.refs.fname).focus();
    } else if (!this.validLastName) {
      alert("Please Input the Last Name")
      ReactDOM.findDOMNode(this.refs.lname).focus();
    } else if (!this.validLnameStatus) {
      alert("Last Name must contain only letters")
      ReactDOM.findDOMNode(this.refs.lname).focus();
    } else if (!this.validEmail) {
      alert("Please Input the Email")
      ReactDOM.findDOMNode(this.refs.email).focus();
    } else if (!this.validEmailStatus) {
      alert("Invalid Email Address");
      ReactDOM.findDOMNode(this.refs.email).focus();
    } else if (!this.validUserName) {
      alert("Please Input the UserName")
      ReactDOM.findDOMNode(this.refs.uname).focus();
    } else if (!this.validPassword) {
      alert("Please Input the Password")
      ReactDOM.findDOMNode(this.refs.password).focus();
    } else if (!this.validPasswordInput) {
      alert("Please Make Sure Password is More than Six Letters");
      ReactDOM.findDOMNode(this.refs.password).focus();
    } else {
      const fnameRef = ReactDOM.findDOMNode(this.refs.fname).value;
      const lnameRef = ReactDOM.findDOMNode(this.refs.lname).value;
      const emailRef = ReactDOM.findDOMNode(this.refs.email).value;
      const unameRef = ReactDOM.findDOMNode(this.refs.uname).value;
      const passwordRef = ReactDOM.findDOMNode(this.refs.password).value;
      if (fnameRef && lnameRef && emailRef && unameRef && passwordRef) {
        this.props.dispatch(registerUserRequest({ fnameRef, lnameRef, emailRef, unameRef, passwordRef }));
      } else {
        alert("Please fill all the form fields");
      }
      this.setState ({
        fname: '',
        lname: '',
        email: '',
        uname: '',
        password: ''
      });
      browserHistory.push('/signin');
    }

    /*if(this.props.isRegistered) {*/
    /*this.setState ({
      fname: '',
      lname: '',
      email: '',
      uname: '',
      password: ''
    });*/
    /*browserHistory.push('/signin');*/
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
                <FormGroup controlId="formHorizontalFirstName" validationState={this.getValidationState()}>
                  <Col componentClass={ControlLabel} sm={2}>
                    First Name
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="First Name" value={this.state.fname} onChange={this.handleFname} ref="fname" />
                    {/*<label ref="roomLicenseError" className={this.state.showResults ? 'hidden' : ''}> 'Room license field can not be empty'</label> */}
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


