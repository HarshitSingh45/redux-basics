const redux = require('redux');
const axios = require('axios');
const createStore = redux.createStore;
const applymiddleware = redux.applyMiddleware;
const thunk = require('redux-thunk').default;


const initialState = {
    loading: false,
    users: [],
    error: ''
}
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}
const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users
    }
}
const fetchUsersFailed = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const fetchUsers = () => {
    return async function(dispatch) {
        dispatch(fetchUserRequest());
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const users = response.data.map((user) => user.name)
            dispatch(fetchUsersSuccess(users));
        }catch(error){
            dispatch(fetchUsersFailed(error.message));
        }
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUESTED :
            return{
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCEEDED :
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED :
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default: return state
    }
}

const store = createStore(reducer, applymiddleware(thunk));
store.subscribe(()=> console.log(store.getState()));
store.dispatch(fetchUsers());
