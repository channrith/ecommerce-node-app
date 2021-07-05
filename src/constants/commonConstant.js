// import ENV from './envConstant';

const COLLECTIONS = {
  USER: 'User',
};

const SORT_BY = {
  ASC: 1,
  DESC: -1,
};

const COOKIE_KEY = {
  REFRESH_TOKEN: 'tc_refresh_token',
};

const REDIS_KEY = {
  ACCESS_TOKEN: 'access_token:audience',
  REFRESH_TOKEN: 'refresh_token:audience',
};

export { COLLECTIONS, COOKIE_KEY, SORT_BY, REDIS_KEY };
