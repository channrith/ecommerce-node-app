import { asyncHandler } from '../../middleware';
import { User } from '../../models';

const getUserAction = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select({
    name: 1,
    history: 1,
    role: 1,
    email: 1,
    createdAt: 1,
    updatedAt: 1,
  });

  if (!user) {
    return res.status(400).json({
      error: 1,
      message: 'User not existed',
      data: { user },
    });
  }

  return res.json({
    error: 0,
    message: 'Success',
    data: { user },
  });
});

export default getUserAction;
