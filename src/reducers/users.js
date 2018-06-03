import C from '../constants';

const defaultState = {
  data: [],
  isLoading: false,
  isLoaded: false,
};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case C.GET_USERS + C.START_LOAD:
      return { ...state, isLoading: true, isLoaded: false };
    case C.GET_USERS + C.FINISH_LOAD:
      return {
        ...state, data: [...payload], isLoading: false, isLoaded: true,
      };
    default:
      return state;
  }
};
