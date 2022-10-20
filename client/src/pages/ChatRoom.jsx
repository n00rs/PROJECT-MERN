import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChatRoom = () => {
  const { userExist } = useSelector((state) => state.auth);
  console.log(userExist);
  const navigate = useNavigate();
  useEffect(() => {
    // first
    if (!userExist) {
      navigate("/");
      toast.dark("please login to continue");
    }
  }, []);

  return <div>ChatRoom</div>;
};

export default ChatRoom;
