import { FETCH_DOCTOR, FETCH_DOCTOR_TIMESLOT, BOOK_APPOINTMENT, BOOK_APPOINTMENT_FAILED, CLEAR_ERROR } from './AppointmentActions';


// Initial State
const initialState = {
  data: [{}],
  timeslots : [],
  isBookingAppointment : true,
  isBookedAppointment : false,
  isBookedAppointmentFailed : false ,
  errorMessage : '',
};


const AppointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOCTOR :
      return {
          data: action.data,
      };

    case FETCH_DOCTOR_TIMESLOT :
      return {
          timeslots: action.data,
          data: state.data
      };

    case BOOK_APPOINTMENT :
      return Object.assign( {}, state, {
          isBookingAppointment : false,
          isBookedAppointment : true, 
      });

    case BOOK_APPOINTMENT_FAILED :
      return Object.assign( {}, state, {
        isBookingAppointment : false,
        isBookedAppointment : false,
        isBookedAppointmentFailed : true,
        errorMessage : action.error
      });

    case CLEAR_ERROR:
      return Object.assign( {}, state, {
          errorMessage : ''
        });

    default:
      return state;
  }
};


// Export Reducer
export default AppointmentReducer;
