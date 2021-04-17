import { FormEventHandler, useState } from "react";
import classes from "./auth-form.module.css";

const createUser = async (email: string, password: string) => {
  const response = await fetch(`/api/auth/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler: FormEventHandler = async (event) => {
    event.preventDefault();

    if (isLogin) {
    } else {
      try {
        const result = await createUser(email, password);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className={classes.auth} onSubmit={submitHandler}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
