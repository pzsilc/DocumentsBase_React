import types from './types';

const setToken = token => ({
    type: types.SET_TOKEN,
    token
});

const removeToken = () => ({
    type: types.REM_TOKEN
});

const fetchUser = user => ({
    type: types.FETCH_USER,
    user
})

const actions = {
    setToken,
    removeToken,
    fetchUser
}

export default actions;