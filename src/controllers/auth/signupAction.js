import { validationResult } from 'express-validator';
import { User } from '../../models';
import { asyncHandler } from '../../middleware';
import { validationErrorFormat } from '../../utils';

const signupAction = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const { message } = validationErrorFormat(errors);
    return res.status(400).json({ error: { message } });
  }

  const {
    id,
    role,
    history,
    name,
    email,
    createdAt,
    updatedAt,
  } = await User.create(req.body);

  return res.json({
    data: {
      id,
      role,
      history,
      name,
      email,
      createdAt,
      updatedAt,
    },
  });
});

export default signupAction;
