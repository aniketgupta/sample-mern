import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import {
  Grid,
  Row,
  Col,
  Button,
  Well,
  Input, Form, FormGroup, FormControl, Checkbox, Radio, ButtonGroup, ControlLabel
} from 'react-bootstrap';;

import {LinkContainer} from 'react-router-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
require("moment-duration-format");

import { fetchDoctorTimeSlots, fetchDoctors, bookAppointmentRequest, clearError } from '../../AppointmentActions';
import { getDoctors } from '../../AppointmentReducer';
import { browserHistory } from 'react-router';
import AuthClient from '../../../../../client/AuthClient';

class BookAppointment extends Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleTimeSlots = this.handleTimeSlots.bind(this);
    this.bookAppointment = this.bookAppointment.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.isBookedAppointmentFailed && nextProps.errorMessage) {
      alert(nextProps.errorMessage);
    }
  }

  handleSelect(data) {
    console.log(data.target.value);
    this.props.dispatch(fetchDoctorTimeSlots(data.target.value));
  }

  handleTimeSlots() {
    this.props.dispatch(clearError());
  }


  bookAppointment(e) {
    e.preventDefault();
    const time = ReactDOM.findDOMNode(this.refs.time).value;
    console.log("time:", time);
    const docID = this.props.timeslots[0].doctorID;
    console.log("docID:", docID)
    const appointmentData = {
      time : time,
      docID : docID
    }
    this.props.dispatch(bookAppointmentRequest(appointmentData));
  }



  render() {
    console.log("props: ", this.props.data)

    if(AuthClient.getToken() != null) {

      /*if(this.props.isBookedAppointmentFailed && this.props.errorMessage) {
        alert(this.props.errorMessage);
      }*/
    
      let displayTimeSlots;
      if (this.props.timeslots) {
        var startTime = moment(this.props.timeslots[0].practiseTimings.monday[0].s1_start_time, ["h:mm A"]).format("h:mm")
        var endTime = moment(this.props.timeslots[0].practiseTimings.monday[0].s1_end_time, ["h:mm A"]).format("h:mm")
        const hourStart = moment.duration(startTime).hours();
        const minStart = moment.duration(startTime).minutes();
        const hourEnd = moment.duration(endTime).hours();
        const minEnd = moment.duration(endTime).minutes();
        const timeSlotGap = this.props.timeslots[0].appointmentDuration;

        const diffHour = hourEnd - hourStart;
        const diffMins = minEnd - minStart;

        var slots = Math.floor(((diffHour * 60) + diffMins) / timeSlotGap);

        /*var starttime = this.props.timeslots[0].practiseTimings.monday[0].s1_start_time;*/
        var interval = this.props.timeslots[0].appointmentDuration;
        var starttime = moment(this.props.timeslots[0].practiseTimings.monday[0].s1_start_time, ["h:mm A"]).format("HH:mm")
        var endtime = moment(this.props.timeslots[0].practiseTimings.monday[0].s1_end_time, ["h:mm A"]).format("HH:mm")
       /* var endtime = this.props.timeslots[0].practiseTimings.monday[0].s1_end_time;*/
        /*var timeslots = [starttime];*/


        if (slots >= 1) {
          var timeslots = [starttime];
          for (var i = 1; i <= slots; i++ ) {
            starttime = addMinutes(starttime, interval);
            timeslots.push(starttime);
          }
          timeslots.pop(endtime);
        } else {
          timeslots = []
        }
        /*alert(timeslots);*/

        
        displayTimeSlots = (
          <div>
            {/*<FormGroup onChange={this.handleRadio}>
                <ControlLabel>Time Slots: </ControlLabel> &nbsp; 
                {
                  timeslots.map(function(data) {
                    console.log("data:", data);
                    return <Radio inline readOnly value={data}>{data}</Radio>
                  })
                }                         
              </FormGroup>*/}
            {
              timeslots.length != 0 ? 
              <div>
                <FormGroup controlId="formControlsSel">
                  <ControlLabel>Select TimeSlots</ControlLabel>
                  <FormControl componentClass="select" placeholder="select timeslots" onChange={this.handleTimeSlots} ref="time">
                    {/*<option>Select TimeSlots</option>*/}
                    {
                      timeslots.map(function(data) {
                        console.log("data:", data);
                        return <option value={data}>{data}</option>
                      })
                    }
                  </FormControl>
                </FormGroup> 
                <FormGroup>
                  <Button type="submit" onClick={this.bookAppointment}>
                    Book
                  </Button>
                </FormGroup>
              </div> : 'No Schedule'
            }
            {/*<FormGroup>
              <Button type="submit" onClick={this.bookAppointment}>
                Book
              </Button>
            </FormGroup>*/}
          </div>
        )
      } else {
        displayTimeSlots = (
          <span></span>
        )
      }

      return (
        <Grid>
          <Row>
            <h2 style={{ textAlign: 'center' }}>Book Appointment</h2>
            <hr/><Col md={3}/>
            <Col md={6}>
              <Well>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select Doctor</ControlLabel>
                  <FormControl componentClass="select" placeholder="select doctor" onChange={this.handleSelect}>
                    <option>Select Doctor</option>
                    {
                      this.props.data.map(function(data) {
                        console.log(data);
                        return <option value={data._id}>{data.fname}</option>
                      })
                    }
                    {/*<option value={this.props.data[0].fname}>{this.props.data[0].fname}</option>
                    <option value={this.props.data[1].fname}>{this.props.data[1].fname}</option>*/}
                  </FormControl>
                </FormGroup>
                  { displayTimeSlots }
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


BookAppointment.need = [() => { return fetchDoctors(); }];
// Retrieve data from store as props
function mapStateToProps(state) {
  console.log("state:", state.doctor.data);
  return {
    data : state.doctor.data,
    timeslots : state.doctor.timeslots,
      isBookingAppointment : state.doctor.isBookingAppointment,
      isBookedAppointment : state.doctor.isBookedAppointment,
      isBookedAppointmentFailed : state.doctor.isBookedAppointmentFailed,
      errorMessage : state.doctor.errorMessage,
  };
}

/*function addMinutes(time, minutes) {
  var date = new Date(new Date('09/12/2016 ' + time).getTime() + minutes * 60000);
  var tempTime = ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
    ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
    ((date.getSeconds().toString().length == 1) ? '0' + date.getSeconds() : date.getSeconds());
    console.log(tempTime)
  return tempTime;
}*/

function addMinutes(time, minsToAdd) {
  function D(J){ return (J<10? '0':'') + J;};
  var piece = time.slice(0)
  var piece = time.split(':');
  var mins = piece[0]*60 + +piece[1] + +minsToAdd;
  console.log(D(mins%(24*60)/60 | 0) + ':' + D(mins%60));
  return D(mins%(24*60)/60 | 0) + ':' + D(mins%60);  
}
export default connect(mapStateToProps)(BookAppointment);
/*export default connect()(BookAppointment);*/



