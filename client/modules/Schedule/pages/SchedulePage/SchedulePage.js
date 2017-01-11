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
import TimePicker from 'react-bootstrap-time-picker';
import Datetime from 'react-datetime';
import moment from 'moment';
require("moment-duration-format");
import DateTimeField from 'react-bootstrap-datetimepicker';
import AuthClient from '../../../../../client/AuthClient';
/*import '../../../../../node_modules/react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css';*/
/*import DateTimePicker from 'react-datetimepicker-bootstrap';*/

// Import Style
/*import styles from './SchedulePage.css';*/

import { createScheduleRequest } from '../../ScheduleActions';
import { browserHistory, Link } from 'react-router';

class ScheduleWidget extends Component {

  constructor(props) {
    super(props);
    this.createSchedule = this.createSchedule.bind(this);
    this.handleStartTime = this.handleStartTime.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    this.handleDuration = this.handleDuration.bind(this);
    /*this.resetForm = this.resetForm.bind(this);*/
    /*this.state = {
      email: '',
      password: ''
    }*/
    this.state = {
      startTime: moment().format('h:mm A'),
      startTimeFormat: "h:mm A",
      startTimeInputFormat: "h:mm A",
      startTimeMode: "time",
      endTime: moment().format('h:mm A'),
      endTimeFormat: "h:mm A",
      endTimeInputFormat: "h:mm A",
      endTimeMode: "time",
      duration: ''
    };
  }

  /*componentWillMount() {
    this.props.dispatch(checkToken());
  }*/

  handleStartTime(newTime) {
    console.log("StartTime:", newTime);
    this.setState({startTime: newTime});

  }

  handleEndTime(newTime) {
    
    
    /*console.log("EndTimeime:", moment.duration(time);*/
    console.log("EndTime:", newTime);
    this.setState({endTime: newTime});
    /*var milliseconds = time;
    console.log(moment.duration(time, "seconds").format('h:mm'));*/

  }

  handleDuration(duration) {
    console.log("Duration:", duration.target.value);
    this.setState({duration: duration.target.value});

  }

  logout() {
    AuthClient.removeToken();

  }

  createSchedule(e) {
    e.preventDefault();
    
    const startTimeRef = this.state.startTime;
    const endTimeRef = this.state.endTime;
    const durationRef = ReactDOM.findDOMNode(this.refs.duration).value;
    if (startTimeRef && endTimeRef && durationRef) {
      this.props.dispatch(createScheduleRequest({ startTimeRef, endTimeRef , durationRef }));
    }

  };


  render() {
    /*if(this.props.isLoginFailed && this.props.errorMessage) {
      alert(this.props.errorMessage);
    }*/
    if(AuthClient.getToken() != null) {
      const {startTime, startTimeFormat, startTimeInputFormat, startTimeMode, endTime, endTimeFormat, endTimeInputFormat, endTimeMode} = this.state;
      return (
        <Grid>
          <Row>
            <h2 style={{ textAlign: 'center' }}>Practise Timings</h2>
            <hr/><Col md={3}/>
            <Link to={'/signin'} onClick={this.logout}>Logout</Link>
            <Col md={6}>
              <Well>
                <Form horizontal>
                  <FormGroup controlId="formHorizontalSTime">
                    <Col componentClass={ControlLabel} sm={2}>
                      Start Time
                    </Col>
                    <Col sm={10}>
                      {/*<FormControl type="email" placeholder="Email" value={this.props.user.email} onChange={this.handleEmail} ref="email" />*/}
                      {/*<TimePicker onChange={this.handleStartTime} value={this.state.StartTime} />*/}
                      {/*<Datetime format="HH:mm:ss"/>*/}
                      <DateTimeField                
                        dateTime={startTime}
                        format={startTimeFormat}
                        inputFormat={startTimeInputFormat}
                        onChange={this.handleStartTime}
                        mode={startTimeMode}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalETime">
                    <Col componentClass={ControlLabel} sm={2}>
                      End Time
                    </Col>
                    <Col sm={10}>
                      {/*<FormControl type="password" placeholder="Password" value={this.props.user.password} onChange={this.handlePassword} ref="password" />*/}
                      {/*<TimePicker onChange={this.handleEndTime} value={this.state.EndTime} />*/}
                      <DateTimeField                
                        dateTime={endTime}
                        format={endTimeFormat}
                        inputFormat={endTimeInputFormat}
                        onChange={this.handleEndTime}
                        mode={endTimeMode}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalDuration">
                    <Col componentClass={ControlLabel} sm={2}>
                      Duration
                    </Col>
                    <Col sm={3}>
                      <FormControl type="text" placeholder="Duration" value={this.state.duration} onChange={this.handleDuration} ref="duration" />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Button type="submit" onClick={this.createSchedule}>
                        Create
                      </Button>
                      &nbsp; &nbsp;
                      <LinkContainer to="/appointment/book">
                        <a>Book Appointment</a>
                      </LinkContainer>
                    </Col>
                  </FormGroup>
                </Form>
              </Well>
            </Col>
          </Row>
        </Grid>
      );
    } else {
        return (
          <div>
            <h1>Not Found</h1>
          </div>
      );
    }
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  console.log("state:", state.schedule.create);
  return {
    create : {
      isCreatingSchedule : state.schedule.create.isCreatingSchedule,
      isCreatedSchedule : state.schedule.create.isCreatedSchedule,
      isCreatedScheduleFailed : state.schedule.create.isCreatedScheduleFailed, 
    }
  };
}

/*export default connect(mapStateToProps)(SigninWidget);*/

export default connect(mapStateToProps)(ScheduleWidget);


