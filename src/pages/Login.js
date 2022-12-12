import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    pass: '',
  };

  onInputChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;
    this.setState({
      [name]: value,
    });
    console.log(value);
  };

  toAbilityBtn = () => {
    const numPass = 6;
    const { email, pass } = this.state;
    const checkPass = pass.length >= numPass;
    const regexMail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const checkEmail = regexMail.test(email);

    return checkPass && checkEmail;
  };

  handleclick = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(login({ email }));
    history.push('/carteira');
  };

  render() {
    return (
      <>
        <div>Login</div>
        <input
          type="text"
          data-testid="email-input"
          name="email"
          onChange={ this.onInputChange }
        />
        E-mail
        <input
          type="text"
          data-testid="password-input"
          name="pass"
          onChange={ this.onInputChange }
        />
        Senha
        <button
          type="submit"
          disabled={ !this.toAbilityBtn() }
          onClick={ this.handleclick }
        >
          Entrar

        </button>
      </>
    );
  }
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
