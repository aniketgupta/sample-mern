import callApi from '../../util/apiCaller';

// Export Constants
export const FETCH_DOCTOR = 'FETCH_DOCTOR';
export const FETCH_DOCTOR_TIMESLOT = 'FETCH_DOCTOR_TIMESLOT';
export const BOOK_APPOINTMENT = 'BOOK_APPOINTMENT';
export const BOOK_APPOINTMENT_FAILED = "BOOK_APPOINTMENT_FAILED";
export const CLEAR_ERROR = "CLEAR_ERROR";

// Export Actions
export function fetchDoctor(data) {
  return {
    type: FETCH_DOCTOR,
    data,
  };
}

export function fetchDoctorTimeSlot(data) {
  return {
    type: FETCH_DOCTOR_TIMESLOT,
    data,
  };
}

export function bookAppointment(data) {
  console.log("data:", data)
  return {
    type: BOOK_APPOINTMENT,
    data,
  };
}
export function bookAppointmentFailed(error) {
  return {
    type: BOOK_APPOINTMENT_FAILED,
    error
  }
}

export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}

export function fetchDoctors() {
  return (dispatch) => {
    return callApi('fetchDoctor').then(res => {
      console.log("res: ", res);
      dispatch(fetchDoctor(res.data));
    });
  };
}

export function fetchDoctorTimeSlots(docID) {
  return (dispatch) => {
    return callApi(`fetchDoctor/${docID}`).then(res => {
      console.log("res: ", res);
      dispatch(fetchDoctorTimeSlot(res.data));
    });
  };
}

export function bookAppointmentRequest(appointmentData) {
  return (dispatch) => {
    return callApi('appointment/book', 'post', {
      bookAppointmentData : {
        time : appointmentData.time,
        docID : appointmentData.docID
      }
    }).then(res => {
      console.log("res:", res);
      if(res.success) {
        dispatch(bookAppointment(res.createAppointmentData))
      }else {
        dispatch(bookAppointmentFailed(res.errorMessage));
      }
    });
  };
}



