import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  calcPrice = () => {
    const { expenses } = this.props;
    const currecyNow = expenses
      .reduce((acc, curr) => acc + curr.value * curr.exchangeRates[curr.currency].ask, 0);
    return (+currecyNow).toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <>
        <div>Header</div>
        <div data-testid="email-field">{ email }</div>
        <div data-testid="total-field">
          { this.calcPrice() }
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape({
    reduce: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
