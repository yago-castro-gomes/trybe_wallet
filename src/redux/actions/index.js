// Coloque aqui suas actions

export const LOGIN = 'LOGIN';
export const CURRENCIES = 'CURRENCIES';
export const EXPENSE = 'EXPENSE';
export const REMOVEEXPENSE = 'REMOVEEXPENSE';

export const login = (email) => ({
  type: LOGIN,
  payload: email,
});

export const curr = (currencies) => ({
  type: CURRENCIES,
  payload: currencies,
});

export const expensesReducer = (state) => ({
  type: EXPENSE,
  payload: state,
});

export const removeExp = (state) => ({
  type: REMOVEEXPENSE,
  payload: state,
});
