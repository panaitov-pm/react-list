import C from '../constants';

const defaultState = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: false,
};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case C.GET_USERS + C.START_LOAD:
      return {
        ...state, isLoading: true, isLoaded: false, error: false,
      };
    case C.GET_USERS + C.FINISH_LOAD:
      return {
        ...state, data: [...payload], isLoading: false, isLoaded: true,
      };
    case C.GET_ERROR:
      return {
        ...state, error: payload, isLoading: false, isLoaded: false,
      };
    default:
      return state;
  }
};
