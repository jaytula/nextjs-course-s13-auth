import { FormEventHandler, useState } from 'react';
import classes from './auth-form.module.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler: FormEventHandler = event => {
    event.preventDefault();

    fetch(`/api/${isLogin ? 'login' : 'signup'}`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log({data});
    })
  }

  return (
    <section className={classes.auth} onSubmit={submitHandler}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
