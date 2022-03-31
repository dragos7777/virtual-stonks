import styles from "./NavBar.module.css";
import Rocket from "../assests/rocket.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
const NavBar = () => {
  const token = useSelector((state) => state.stonks.token);

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        {" "}
        <span> {"VIRTUAL STONKS"} </span>{" "}
        <img
          src={Rocket}
          alt="Rocket to the moon"
          className={styles.rocket}
        ></img>
      </div>
      <nav className={styles.nav}>
        {token && (
          <ul className={styles["nav-list"]}>
            <li>
              {" "}
              <NavLink className={styles.link} to="/virtual-stonks/search">
                SEARCH
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink className={styles.link} to="/virtual-stonks/my-stonks">
                MY STONKS
              </NavLink>{" "}
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
