import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExp } from '../redux/actions';

class Table extends Component {
  // removeExpenses = (event) => {
  //   const { expenses, dispatch } = this.props;
  //   const filterExpenses = expenses
  //   .filter((id) => event.target.id !== id.id)
  //   console.log(filterExpenses);
  //   dispatch(expensesReducer(filterExpenses));
  //   return filterExpenses;
  // };

  render() {
    const { expenses, dispatch } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((element) => (
            <tr key={ element.id }>
              <td>
                { element.description }
              </td>
              <td>
                { element.tag }
              </td>
              <td>
                { element.method }
              </td>
              <td>
                { Number(element.value).toFixed(2) }
              </td>
              <td>
                { (element.exchangeRates[element.currency].name) }
              </td>
              <td>
                { Number(element.exchangeRates[element.currency].ask).toFixed(2)}
              </td>
              <td>
                { Number(element.value * element.exchangeRates[element.currency].ask)
                  .toFixed(2) }
              </td>
              <td>
                Real
              </td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                >
                  Editar

                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => dispatch(removeExp(element)) }
                >
                  Excluir

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
