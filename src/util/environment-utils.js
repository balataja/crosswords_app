
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
      //return 'https://pacific-savannah-08041.herokuapp.com';
      return 'https://balataja-crosswords-api-94aeb475ef42.herokuapp.com'
    case 'stage':
    case 'test':
    case 'development':
      //return 'http://localhost:3000' // for node.js end point
      //return 'http://localhost:7186' // for .net core end point
    default:
      return 'http://localhost:3000' // for node.js end point
      //return 'https://localhost:7186' // for .net core end point

      //return 'https://pacific-savannah-08041.herokuapp.com'
  }
};

export const getApiLoginUrl = () => {
  switch (getEnvironment()) {
    // case 'heroku_build':
    //   return '';
    case 'production':
      //return 'https://pacific-savannah-08041.herokuapp.com';
      return 'https://balataja-crosswords-api-94aeb475ef42.herokuapp.com'
    case 'stage':
    case 'test':
    case 'development':
      return 'http://localhost:3000' // for node.js end point
      //return 'https://localhost:7186' // for .net core end point
    default:
      //return 'https://pacific-savannah-08041.herokuapp.com'
      return 'http://localhost:3000' // for node.js end point
      //return 'https://localhost:7186' // for .net core end point
  }
};


/**
 * getAppUrl  - Returns the URL for the app, given the environment
 * @returns {String}
 */
export const getAppUrl = () => {
  switch (getEnvironment()) {
    case 'production':
      //return 'https://crosswordswithfriends.herokuapp.com';
      return 'https://balataja-crosswords-app.herokuapp.com'
    case 'stage':
    case 'test':
    case 'development':
      return 'https://localhost:8080';
    default:
      return 'https://localhost:8080';
      //return 'https://crosswordswithfriends.herokuapp.com';
  }
};
