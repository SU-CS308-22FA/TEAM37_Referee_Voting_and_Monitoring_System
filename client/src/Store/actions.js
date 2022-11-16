import {  SET_TOKEN, SET_USER, FREE_TOKEN, FREE_USER } from "./types";

export const setToken = (token) => {
    return{
        type: SET_TOKEN,
        payload: token
    };
};

export const freeToken = (token) => {
    return{
        type: FREE_TOKEN,
        payload: token
    };
};

export const setUser = (user) => {
    return{
        type: SET_USER,
        payload: user
    };
};

export const freeUser = () => {
    return{
        type: FREE_USER,
    };
};