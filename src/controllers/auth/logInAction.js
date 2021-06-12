import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'; // to generate signed token
import { validationErrorFormat } from '../../utils';
import { User } from '../../models';

const logInAction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const { message } = validationErrorFormat(errors);
    return res.status(400).json({ error: { message } });
  }

  // find the user based on email
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      error: { message: 'Email does not exist. Please signup' },
    });
  }

  // if user is found make sure the email and password match
  // create authenticate method in user model
  if (!user.authenticate(password)) {
    return res.status(401).json({
      error: { message: 'Email or password does not match' },
    });
  }

  // generate a signed token with user id and secret
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  // persist the token as 't' in cookie with expiry date
  res.cookie('t', token, { expire: new Date() + 9999 });

  // return response with user and token to frontend client
  const { _id, name, role } = user;
  return res.json({ token, user: { _id, email: user.email, name, role } });
};

export default logInAction;
