import { body } from 'express-validator';

export const loginValidator = [
  body('email', 'Please enter your login email').notEmpty(),
  body('password', 'Please enter your password').notEmpty(),
];

export const signupValidator = [
  body('name', 'Name field is required').notEmpty(),
  body('email')
    .notEmpty()
    .withMessage('Email field is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 chars long')
    .matches(/\d/)
    .withMessage('Password must contain a number'),
];
