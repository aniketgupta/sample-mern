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
import moment from 'moment';
require("moment-duration-format");
import DateTimeField from 'react-bootstrap-datetimepicker';

import { fetchTimeSlots } from '../../ScheduleActions';
import { getTimeSlots } from '../../ScheduleReducer';
import { browserHistory } from 'react-router';

class ViewScheduleWidget extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.dispatch(fetchTimeSlots());
  }


  render() {
    console.log("props: ", this.props)
    return (
      <Grid>
        <Row>
          <h2 style={{ textAlign: 'center' }}>Practise Timings</h2>
          <hr/><Col md={3}/>
          <Col md={6}>
            <Well>
              <h1>start time</h1>
              {this.props.timeslots.data[0].practiseTimings.monday[0].s1_start_time}
              <h1>end time</h1>
              {this.props.timeslots.data[0].practiseTimings.monday[0].s1_end_time}
              <h1>time slot</h1>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }
}
ViewScheduleWidget.need = [() => { return fetchTimeSlots(); }];
// Retrieve data from store as props
function mapStateToProps(state) {
  console.log("state:", state.schedule.timeslots);
  return {
    timeslots : {
      data : state.schedule.timeslots.data, 
    }
  };
}

export default connect(mapStateToProps)(ViewScheduleWidget);

/*export default connect(mapStateToProps)(ScheduleWidget);*/


