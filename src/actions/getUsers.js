import C from '../constants';

export default () => (dispatch) => {
  dispatch({
    type: C.GET_USERS + C.START_LOAD,
  });
  fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then((users) => {
    dispatch({
      type: C.GET_USERS + C.FINISH_LOAD,
      payload: users,
    });
  });
};

