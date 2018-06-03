import C from '../constants';

const defaultState = {
  name : '',
  email: '',
};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case C.SAVE_USER_INFO:
      return { ...state, ...payload };
    default:
      return state;
  }
};
