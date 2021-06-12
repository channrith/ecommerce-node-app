import { responseJson } from '../../utils';

const logOutAction = async (req, res) => {
  res.clearCookie('t');
  return responseJson(res, {}, 'You have logged out');
};

export default logOutAction;
