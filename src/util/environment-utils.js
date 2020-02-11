
/**
 * getEnvironment - Returns the current environment, or development by default
 * @returns {String}
 */
export const getEnvironment = () => process.env.NODE_ENV
  ? process.env.NODE_ENV
  : 'development';


/**
 * getApiUrl  - Returns the URL for the api, given the current environment
 * @returns {String}
 */
export const getApiUrl = () => {
  switch (getEnvironment()) {
    // case 'heroku_build':
    //   return '';
    case 'production':
      return 'https://pacific-savannah-08041.herokuapp.com';
    case 'stage':
    case 'test':
    case 'development':
    default:
      //return 'http://localhost:3000';
      return 'https://pacific-savannah-08041.herokuapp.com'
  }
};


/**
 * getAppUrl  - Returns the URL for the app, given the environment
 * @returns {String}
 */
export const getAppUrl = () => {
  switch (getEnvironment()) {
    case 'production':
      //return 'https://limitless-beyond-75437.herokuapp.com';
    case 'stage':
    case 'test':
    case 'development':
    default:
      //return 'https://limitless-beyond-75437.herokuapp.com';
      return 'http://localhost:8080';
  }
};
