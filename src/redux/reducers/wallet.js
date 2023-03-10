// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES, EXPENSE, REMOVEEXPENSE } from '../actions';

export const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVEEXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.payload.id),
    };
  default:
    return state;
  }
};

export default walletReducer;
