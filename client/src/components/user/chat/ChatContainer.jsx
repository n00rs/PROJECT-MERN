import React, { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import { useSelector } from "react-redux";
import { FETCH_MSGS_URL } from "../../../Constant";
import styles from "./ChatContainer.module.css";

export const ChatContainer = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMessage] = useState(null);
  const user = useSelector((state) => state.auth);
  const scrollRef = useRef();

  const handleMsg = async (msg) => {
    try {
      // console.log(currentChat);
      // console.log(msg);
      socket.current.emit("send-msg", {
        from: user.userExist,
        to: currentChat._id,
        message: msg,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    } catch (error) {
      console.log(error, ".......err in chatcontainer");
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(FETCH_MSGS_URL + currentChat._id, {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setMessages(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log(msg, "recived");
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  console.log(scrollRef.current);
  
  
  
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
      <div className={styles["chat-messages"]} >
        {messages.map((msg) => (
          <div>
            {" "}
            <div ref={scrollRef}
              className={`${styles.message}  ${
                msg.fromSelf ? styles.sended : styles.recieved
              }`}
            >
              <div className={styles["content"]}>
                <p>{msg.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleMsg} />
    </div>
  );
};
