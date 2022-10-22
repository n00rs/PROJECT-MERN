import React, { useState } from "react";
import styles from "./ChatContainer.module.css";
import { ChatInput } from "./ChatInput";

export const ChatContainer = ({ currentChat }) => {
  const [messages, setMessages] = useState([]);

  return (
    <div className={styles["chat-container"]}>
      <div className={styles["user-details"]}>
        <div className={styles["chat-header"]}>
          <div className={styles.avatar}>
            <img src={currentChat.picture} alt="" />
          </div>
          <div className={styles.username}>
            <h3>{currentChat.firstName}</h3>
          </div>
        </div>
      </div>
      <div className={styles["chat-messages"]}>
        {messages.map((msg) => (
          <div>
            {" "}
            <div
              className={`${styles.message}  ${
                msg.fromself ? styles.sended : styles.recieved
              }`}
            >
              <div className={styles['content']}>
                <p>{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput />
    </div>
  );
};
