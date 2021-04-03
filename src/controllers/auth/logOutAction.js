import { responseJson } from '../../utils';
import { asyncHandler } from '../../middleware';

const logOutAction = asyncHandler(async (req, res) => {
  res.clearCookie('t');
  return responseJson(res, {}, 'You have logged out');
});

export default logOutAction;
