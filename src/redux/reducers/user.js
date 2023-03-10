import { LOGIN } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  } };

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return action.payload;
  default:
    return state;
  }
};

export default userReducer;
