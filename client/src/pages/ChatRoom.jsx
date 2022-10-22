import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ChatContainer } from "../components/user/chat/ChatContainer";
import { Contacts } from "../components/user/chat/Contacts";
import { Welcome } from "../components/user/chat/Welcome";
import { FETCH_USERS_URL } from "../Constant";
import styles from "./ChatRoom.module.css";
const ChatRoom = () => {
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const navigate = useNavigate();
  const { userExist } = useSelector((state) => state.auth);

  console.log(userExist);
  
  
  const fetchAllusers = async () => {
    try{

      const response = await fetch(FETCH_USERS_URL, { credentials: "include" });
      const data = await response.json();
      console.log(data);
      if(!response.ok) throw data
      setContacts(data)
    }catch (err){
      console.log(err+'...errin fetcinhg user');
    }



  };

  
  useEffect(() => {
    // first
    if (!userExist) {
      navigate("/");
      toast.dark("please login to continue");
    } else {
      fetchAllusers()
    }
  }, []);




  const chatHandler = (chat) => setCurrentChat(chat);
  return (
    <div className={styles["chatRoom-container"]}>
      <div className={styles.container2}>
        <Contacts
          contacts={contacts}
          currentUser={userExist}
          changeChat={chatHandler}
        />
        {currentChat === "" ? (
          <Welcome currentUser={userExist} />
        ) : (
          <ChatContainer currentChat={currentChat} />
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
