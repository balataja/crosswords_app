import _ from 'lodash';
import { APP_NAMESPACE } from '../../util/redux-constants';
import { put, post, get, del } from '../../util/http-utils';
import { handleError } from '../../util/store-utils';

// node.js api Constants
// const GRIDSTATE_ENDPOINT_BASE = 'game';
// const GetGame = `${typeBase}GET_GAME`;
// const GetGames = `${typeBase}GET_GAMES`;
// const AddGame = `${typeBase}ADD_GAME`;
// const JoinGame = `${typeBase}JOIN_GAME`;

// .net core api constants
const GRIDSTATE_ENDPOINT_BASE = 'game';
const GetGame = 'GetGame';
const GetGames = 'GET_GAMES'; // when do I do this?
const AddGame = 'AddGame';
const JoinGame = 'JoinGame';

const typeBase = `${APP_NAMESPACE}/${GRIDSTATE_ENDPOINT_BASE}/`;

const GET_GAME = `${typeBase}GetGame`;
const GET_GAMES = `${typeBase}${GetGames}`;
const ADD_GAME = `${typeBase}${AddGame}`;
const JOIN_GAME = `${typeBase}${JoinGame}`;

// Actions
export const getGame = (gameId) => async (dispatch) => {
    try {
        // if (gameId == undefined)
        // {
        //     console.log('gridState id cannot be undefined..');
        // } else {
            const response = await get(dispatch, GET_GAME, `${GRIDSTATE_ENDPOINT_BASE}/${GetGame}/${gameId}`, true);
            return Promise.resolve(response);
        //}
    } catch (err) {
        await handleError(dispatch, err, GET_GAME);
    }
}

export const getGames = (userId) => async (dispatch) => {
    try {
        const response = await get(dispatch, GET_GAMES, `${GRIDSTATE_ENDPOINT_BASE}/get-games/${userId}`, true);
        return Promise.resolve(response);
    } catch (err) {
        await handleError(dispatch, err, GET_GAMES);
    }
}

export const addGame = (game) => async (dispatch) => {
    try {
        const response = await post(dispatch, ADD_GAME, `${GRIDSTATE_ENDPOINT_BASE}/add-game`, game, true);
        return Promise.resolve(response);
    } catch (err) {
        await handleError(dispatch, err, ADD_GAME);
    }
}

export const joinGame = (player) => async (dispatch) => {
    try {
        const response = await post(dispatch, JOIN_GAME, `${GRIDSTATE_ENDPOINT_BASE}/join-game`, player, true);
        return Promise.resolve(response);
    } catch (err) {
        await handleError(dispatch, err, JOIN_GAME);
    }
}