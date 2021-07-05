import jwt from 'jsonwebtoken';
import { ENV } from '../constants';

/* 
  Description: True when given string is a JSON string
  @param(
    str    String
  )
*/
export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/* 
  Description: Print error detail to console
  @param(
    fn    String
    error Object
  )
*/
export const printError = (fn, error) => {
  const dt = new Date(new Date().getTime());
  console.log(`<<<<<<<< Function ${fn}:`, error, dt.toString());
};

/* 
  Description: Extract validation error message
  @param(
    errors Array
  )
*/
export const validationErrorFormat = (errors) => {
  const { param, msg } = errors[0];
  return { param, message: msg };
};

/* 
  Description: Generate a signed JWT with user id
  @param(
    audience    ObjectId
    secret  String
    expiresIn   Int|String
  )
*/
export const signToken = ({
  audience,
  secret,
  expiresIn = ENV.REFRESH_TOKEN_EXPIRE,
}) => {
  try {
    const token = jwt.sign({ _id: audience }, secret, { expiresIn });
    return [token, null];
  } catch (err) {
    printError('signToken', err);
    return [null, err];
  }
};

/* 
  Description: Verify jwt access token
  @param(
    token   String
    secret  String
  )
*/
export const verifyToken = (token, secret) => {
  try {
    const data = jwt.verify(token, secret);
    return [data, null];
  } catch (err) {
    printError('signToken', err);
    return [null, err];
  }
};
