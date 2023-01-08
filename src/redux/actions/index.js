// Coloque aqui suas actions

export const LOGIN = 'LOGIN';
export const CURRENCIES = 'CURRENCIES';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const curr = (currencies) => ({
  type: CURRENCIES,
  currencies,
});
