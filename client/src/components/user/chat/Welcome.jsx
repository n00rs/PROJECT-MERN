import React from "react";
import welcomeLogo from '../../../assets/welcome-13.gif'
import styles from "./Welcome.module.css";


export const Welcome = ({ currentUser }) => {
  return (
    <div className={styles['welcome-container']}>
      <img src={welcomeLogo} alt="welcome" />
      <h1>
        Welcome <span>{currentUser.userName}...!</span>
      </h1>
      <h3>please select an user to start messaging</h3>
    </div>
  );
};
