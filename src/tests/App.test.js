import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import Wallet from '../pages/Wallet';

describe('Verifica a página de LOGIN', () => {
  test('Verifica se a página possui um texto Hello Trybe Wallet', () => {
    renderWithRouterAndRedux(<App />);
    const textTrybe = screen.getByText(/hello, trybewallet!/i);

    expect(textTrybe).toBeInTheDocument();
  });
  test('Verifica se a página possui um texto LOGIN em um H2', () => {
    renderWithRouterAndRedux(<App />);
    const textH2 = screen.getByRole('heading', {
      name: /login/i,
      level: 2,
    });
    expect(textH2).toBeInTheDocument();
  });
  test('Verifica se a página possui dois inputs', () => {
    renderWithRouterAndRedux(<App />);
    const btnEnter = screen.getByRole('button');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    userEvent.type(emailInput, 'yago.fanstour@gmail.com');
    userEvent.type(passwordInput, 'tkpk5fsw');
    expect(btnEnter).toBeVisible();
  });
  test('Verifica se a página possui um botão de Entrar', () => {
    renderWithRouterAndRedux(<App />);
    const btnEnter = screen.getByRole('button');
    expect(btnEnter).toBeInTheDocument();
  });
  test('Verifica se ao clicar no botão carrega a proxima página', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnEnter = screen.getByRole('button');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(emailInput, 'yago.fanstour@gmail.com');
    userEvent.type(passwordInput, 'tkpk5fsw');
    expect(btnEnter).toBeVisible();
    userEvent.click(btnEnter);
    history.push('/carteira');
    expect(history.location.pathname).toBe('/carteira');
  });
});
describe('Verifica o component Wallet', () => {
  test('Testa os inputs', async () => {
    renderWithRouterAndRedux(<WalletForm />);
    const descriptInput = await screen.getByTestId('description-input');
    expect(descriptInput).toBeInTheDocument();
    const btnSpend = await screen.getByRole('button', {
      name: /Adicionar despesa/i,
    });
    expect(btnSpend).toBeInTheDocument();
  });
  test('Testa a tabela', async () => {
    renderWithRouterAndRedux(<Table />);
    const tabela = await screen.getByRole('table');
    expect(tabela).toBeInTheDocument();
  });
  test('Testa se as despesas são exibidas na tela', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const value = screen.getByText(/valor da despesa/i);
    expect(value).toBeInTheDocument();
    const inputValue = screen.getByTestId('value-input');
    userEvent.type(inputValue, '355');
    const descrInput = screen.getByTestId('description-input');
    userEvent.type(descrInput, 'check');
    const btnSpend = screen.getByRole('button', {
      name: /Adicionar despesa/i,
    });
    userEvent.click(btnSpend);
    const descrptTable = await screen.getByRole('cell', {
      name: /check/i,
    });
    const valueTable = await screen.getByRole('cell', {
      name: /355\.00/i,
    });
    expect(descrptTable).toBeInTheDocument();
    expect(valueTable).toBeInTheDocument();
  });
});
