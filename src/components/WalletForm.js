import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { curr } from '../redux/actions';

class WalletForm extends Component {
  state = {
    savecurrencies: [],
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

  render() {
    const { savecurrencies } = this.state;
    return (
      <>
        <div>WalletForm</div>
        <label htmlFor="depesa">
          Valor da despesa
          <input type="number" id="despesa" data-testid="value-input" />
        </label>
        <label htmlFor="description">
          Descrição
          <input type="text" id="description" data-testid="description-input" />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select data-testid="currency-input" id="moeda">
            { savecurrencies.map((currr) => <option key={ currr }>{ currr }</option>) }
          </select>
        </label>
        <label htmlFor="methodpay">
          Método de Pagamento
          <select data-testid="method-input" id="methodpay">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito ">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria" data-testid="tag-input">
          Categoria
          <select id="categoria">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </>

    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(WalletForm);
