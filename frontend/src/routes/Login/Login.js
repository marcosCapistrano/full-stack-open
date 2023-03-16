import React, { useEffect, useState } from "react";
import {Navigate} from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from "./Login.module.css";
import logger from "../../utils/logger";

export default function Login({session, setSession}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if(session) {
      return <Navigate to="/" replace />
  }

  return (
    <>
      <h1 className={styles.title}>Login</h1>
      <LoginForm setSession={setSession}/>
    </>
  );
}
