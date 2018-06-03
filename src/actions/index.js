import C from '../constants';

export const saveUserInfo = data => ({
  type   : C.SAVE_USER_INFO,
  payload: data,
});
