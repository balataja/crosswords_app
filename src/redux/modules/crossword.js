import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';

// node.js api Constants
const CROSSWORD_ENDPOINT_BASE = 'crossword';
const CrosswordAPI = 'GET_CROSSWORD'
const CrosswordsAPI = 'GET_CROSSWORDS'
const RandomCrosswordAPI = 'GET_RANDOM_CROSSWORD'
const RandomSundayCrosswordAPI = 'GET_RANDOM_SUNDAY_CROSSWORD'

// .net core api constants
// const CROSSWORD_ENDPOINT_BASE = 'crosswords';
// const CrosswordAPI = 'Get'
// const CrosswordsAPI = '' //why do I need to grab all crosswords?
// const RandomCrosswordAPI = 'GetWeekday'
// const RandomSundayCrosswordAPI = 'GetSunday'

const typeBase = `${APP_NAMESPACE}/${CROSSWORD_ENDPOINT_BASE}/`;

const GET_CROSSWORD = `${typeBase}${CrosswordAPI}`;
const GET_CROSSWORDS = `${typeBase}${CrosswordsAPI}`;
const GET_RANDOM_CROSSWORD = `${typeBase}${RandomCrosswordAPI}`;
const GET_RANDOM_SUNDAY_CROSSWORD = `${typeBase}${RandomSundayCrosswordAPI}`;

// Actions

/**
 * getCrossword  - Fetches crossword from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getCrossword = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_CROSSWORD, `${CROSSWORD_ENDPOINT_BASE}/${CrosswordAPI}/${id}`, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_CROSSWORD);
  }
};

/**
 * getCrosswords  - Fetches crosswords from API
 *
 * @returns {Promise}
 */
export const getCrosswords = () => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_CROSSWORDS, `${CROSSWORD_ENDPOINT_BASE}/${CrosswordsAPI}`, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_CROSSWORDS);
  }
};

/**
 * getCrossword  - Fetches crossword from API, given id
 *
 * @param {String} id User's id for lookup
 * @returns {Promise}
 */
export const getRandomCrossword = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_RANDOM_CROSSWORD, `${CROSSWORD_ENDPOINT_BASE}/${RandomCrosswordAPI}`, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_RANDOM_CROSSWORD);
  }
};

export const getRandomSundayCrossword = (id) => async (dispatch) => {
  try {
    const response = await get(dispatch, GET_RANDOM_SUNDAY_CROSSWORD, `${CROSSWORD_ENDPOINT_BASE}/${RandomSundayCrosswordAPI}`, true);
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_RANDOM_SUNDAY_CROSSWORD);
  }
};