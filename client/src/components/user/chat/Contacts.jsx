import React, { useState } from "react";
import styles from "./Contacts.module.css";
import userLogo from "../../../assets/user-icon.jpg";
import companyLogo from "../../../assets/logo.png";

export const Contacts = ({ contacts, changeChat, currentUser }) => {
  const [currentSelected, setCurrentSelected] = useState();

  const changeCurrentChat = (ind, contact) => {
    console.log("change");
    setCurrentSelected(ind);
    changeChat(contact);
  };

  return (
    <div className={styles["contact-container"]}>
      <div className={styles.brand}>
        <img src={companyLogo} alt="logo" />
        <h3>title</h3>
      </div>
      <div className={styles.contacts}>
        {contacts.map((contact, index) => {
          return (
            <div
              className={`${styles.contact}  ${
                index === currentSelected ? styles.selected : ""
              }`}
              key={contact._id}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className={styles.avatar}>
                <img
                  src={contact?.picture ? contact.picture : userLogo}
                  alt="logo"
                />
                <div className={styles.username}>
                  <h5>{contact.firstName}</h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles["current-user"]}>
        <div className={styles.avatar}>
          <img
            src={currentUser.picture ? currentUser.picture : userLogo}
            alt="img"
          />
          <div className={styles.username}>

          <h2>{currentUser}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
