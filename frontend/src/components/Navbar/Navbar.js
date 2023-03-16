import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.links}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive && "link-active"}
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/new"
            className={({ isActive }) => isActive && "link-active"}
          >
            NEW
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notes"
            className={({ isActive }) => isActive && "link-active"}
          >
            NOTES
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
