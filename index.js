
const redux = require('redux');
const createStore = redux.createStore;

const ORDERCAKE = 'ORDERCAKE';
const ORDERICECREAM = 'ORDERICECREAM';

const makeCakeOrder = (qty=1) => {
  return {
    type: ORDERCAKE,
    payload: qty
  }
}
const makeIceCreamOrder = (qty=1) => {
  return {
    type: ORDERICECREAM,
    payload: qty
  }
}

const initialCakeState = {
  qty: 10
}
const initialIceCreamState = {
  qty: 20
}

const cakeReducer = (state=initialCakeState, action) => {
  switch(action.type) {
    case ORDERCAKE:
      return {
        ...state,
        qty: state.qty - action.payload
      }
    default: return state
  }
}
const icecreamReducer = (state=initialIceCreamState, action) => {
  switch(action.type) {
    case ORDERICECREAM:
      return {
        ...state,
        qty: state.qty - action.payload
      }
    default: return state
  }
}

const rootReducer = redux.combineReducers({
  cake: cakeReducer, 
  icecream: icecreamReducer
})

const store = createStore(rootReducer);
console.log('Initial state ', store.getState());
const unsubscribe = store.subscribe(() => console.log('updated state ', store.getState()))

store.dispatch(makeCakeOrder());
store.dispatch(makeCakeOrder());
store.dispatch(makeCakeOrder());

store.dispatch(makeIceCreamOrder());

unsubscribe();