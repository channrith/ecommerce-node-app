import { User } from '../../models';
import { responseJson, responseBadRequest } from '../../utils';

const getUserByIdAction = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).select({
    name: 1,
    history: 1,
    role: 1,
    email: 1,
    createdAt: 1,
    updatedAt: 1,
  });

  if (!user) {
    const errorMessage = 'User not existed';
    return responseBadRequest(res, errorMessage);
  }

  return responseJson(res, user);
};

export default getUserByIdAction;
