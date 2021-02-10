import { asyncHandler } from '../../middleware';
import { User } from '../../models';
import { badRequest } from '../../utils';

const getUserByIdAction = asyncHandler(async (req, res) => {
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
    return badRequest(res, 'User not existed');
  }

  return res.json({
    error: 0,
    message: 'Success',
    data: { user },
  });
});

export default getUserByIdAction;
