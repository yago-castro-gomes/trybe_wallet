import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { curr, expensesReducer } from '../redux/actions';

class WalletForm extends Component {
  state = {
    savecurrencies: [],
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: [],

  };

  componentDidMount() {
    this.stateCurriencies();
  }

  fetchCurrencies = async () => {
    const url = await 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  stateCurriencies = async () => {
    const { dispatch } = this.props;
    const recover = await this.fetchCurrencies();
    delete recover.USDT;
    const currencies = Object.keys(recover);
    this.setState({
      savecurrencies: currencies,
    });
    dispatch(curr(currencies));
  };

  onInputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleClickBtn = async () => {
    const { id, description, currency, method, tag, value, exchangeRates } = this.state;
    const recover = await this.fetchCurrencies();
    delete recover.USDT;
    this.setState((prevState) => ({
      ...prevState,
      id: prevState.id + 1,
      exchangeRates: recover,
    }));
    const { dispatch } = this.props;
    const objSaving = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: recover,
    };

    dispatch(expensesReducer(objSaving));

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: [],
    });
    console.log(exchangeRates);
  };

  render() {
    const {
      savecurrencies, method, tag, description, value, currency } = this.state;
    return (
      <>
        <div>WalletForm</div>
        <label htmlFor="depesa">
          Valor da despesa
          <input
            type="number"
            id="despesa"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            id="description"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select
            data-testid="currency-input"
            id="moeda"
            name="currency"
            value={ currency }
            onChange={ this.onInputChange }
          >
            { savecurrencies.map((currr) => <option key={ currr }>{ currr }</option>) }
          </select>
        </label>
        <label htmlFor="methodpay">
          Método de Pagamento
          <select
            data-testid="method-input"
            id="methodpay"
            name="method"
            value={ method }
            onChange={ this.onInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          Categoria
          <select
            id="categoria"
            data-testid="tag-input"
            onChange={ this.onInputChange }
            name="tag"
            value={ tag }
          >
            <option value="Alimentacão">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="submit" onClick={ this.handleClickBtn }>Adicionar despesa</button>
      </>

    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(WalletForm);
