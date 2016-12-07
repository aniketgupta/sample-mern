import callApi from '../../util/apiCaller';

// Export Constants
export const CREATE_SCHEDULE = 'CREATE_SCHEDULE';
export const FETCH_TIMESLOT = 'FETCH_TIMESLOT';

// Export Actions
export function createSchedule(createScheduleData) {
  return {
    type: CREATE_SCHEDULE,
    createScheduleData,
  };
}


export function fetchTimeSlot(timeslots) {
  return {
    type: FETCH_TIMESLOT,
    timeslots,
  };
}

export function createScheduleRequest(schedule) {
  return (dispatch) => {
    return callApi('schedule/create', 'post', {
      createScheduleData : {
        practiseTimings: {
          monday : [{
            s1_start_time : schedule.startTimeRef,
            s1_end_time : schedule.endTimeRef
          }]
        },
        appointmentDuration : schedule.durationRef
      },
    }).then(res => {
      console.log("res:", res);
      if(res.success) {
        dispatch(createSchedule(res.createScheduleData))
      }
    });
  };
}

export function fetchTimeSlots() {
  return (dispatch) => {
    return callApi('schedule/view').then(res => {
      console.log("res: ", res);
      dispatch(fetchTimeSlot(res.timeslots));
    });
  };
}

