
const redux = require('redux');
const createStore = redux.createStore;

const ORDERCAKE = 'ORDERCAKE';

const makeOrder = () => {
  return {
    type: ORDERCAKE,
    qty: 1
  }
}

const initialState = {
  qty: 10
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case ORDERCAKE:
      return {
        ...state,
        qty: state.qty - action.qty
      }
    default: return state
  }
}

const store = createStore(reducer);
console.log('Initial state ', store.getState());
const unsubscribe = store.subscribe(() => console.log('updated state ', store.getState()))

store.dispatch(makeOrder());
store.dispatch(makeOrder());
store.dispatch(makeOrder());

unsubscribe();