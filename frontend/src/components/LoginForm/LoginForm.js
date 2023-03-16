import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './LoginForm.module.css';
import loginService from '../../services/login';
import logger from "../../utils/logger";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const login = await loginService.login({username, password});

    window.localStorage.setItem("session", login);
    navigate("/", {
      replace: true,
    });
  }

  return (
      <form onSubmit={handleLoginSubmit} className={styles.form}>
        <div>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
      </div>
        <button type="submit">login</button>
      </form>
  )
}

export default LoginForm