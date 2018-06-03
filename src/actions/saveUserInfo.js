import C from '../constants';

export default data => ({
  type: C.SAVE_USER_INFO,
  payload: data,
});

