import C from '../constants';

export default () => (dispatch) => {
  dispatch({
    type: C.GET_USERS + C.START_LOAD,
    payload: false,
  });
  fetch('https://jsonplaceholder.typicode.com/users').then(response => handleErrors(response)).then((users) => {
    dispatch({
      type: C.GET_USERS + C.FINISH_LOAD,
      payload: users,
    });
  }).catch(() => {
    dispatch({
      type: C.GET_ERROR,
      payload: true,
    });
  });
};

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
}

