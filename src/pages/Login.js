import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <>
        <div>Login</div>
        <input type="text" data-testid="email-input" />
        E-mail
        <input type="password" data-testid="password-input" />
        Senha
        <button type="submit">Entrar</button>
      </>
    );
  }
}

export default Login;
