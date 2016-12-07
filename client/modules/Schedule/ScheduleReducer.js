import { CREATE_SCHEDULE, FETCH_TIMESLOT } from './ScheduleActions';


// Initial State
const initialState = {
  create : {
    isCreatingSchedule : true,
    isCreatedSchedule : false,
    isCreatedScheduleFailed : false, 
  },
  timeslots : {
    data : []
  }
};

const ScheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SCHEDULE :
      return Object.assign( {}, state, {
        create : {
          isCreatingSchedule : false,
          isCreatedSchedule : true, 
        }
      });

    case FETCH_TIMESLOT :
      return {
        timeslots : {
          data: action.timeslots,
        }
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all timeslots
/*export const getTimeSlots = state => state.timeslots.timeslots.data;*/

// Export Reducer
export default ScheduleReducer;
