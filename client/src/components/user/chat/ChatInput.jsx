import React, { useState } from "react";
import styles from "./Chatinput.module.css";

export const ChatInput = ({ handleSendMsg }) => {
  const [message, setMessage] = useState("");

  const messageHandler = (event) => {
    event.preventDefault();
    console.log(message);
    handleSendMsg(message);
    setMessage('')
  };

  return (
    <div>
      <form className={styles["input-container"]} onSubmit={messageHandler}>
        <input
          type="text"
          name="message"
          placeholder="type your message here"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className={styles.submit}> send</button>
      </form>
    </div>
  );
};
