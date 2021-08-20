import types from './types';
import packageJson from '../../../package.json';


const initState = {
    token: window.localStorage.getItem(packageJson.tokenKey),
    user: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case types.SET_TOKEN: {
            window.localStorage.setItem(packageJson.tokenKey, action.token);
            return {
                ...state,
                token: action.token
            }
        }
        case types.REMOVE_TOKEN: {
            window.localStorage.removeItem(packageJson.tokenKey);
            return {
                ...state,
                token: null
            }
        }
        case types.FETCH_USER: {
            return {
                ...state,
                user: action.user
            }
        }
        default:
            return state
    }
}

export default authReducer;