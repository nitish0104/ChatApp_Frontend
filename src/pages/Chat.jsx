import React, { useEffect } from "react";
import { ChatState } from "../Context/chatProvider";
const Chat = () => {
  const { user } = ChatState();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div>
      <div>hello</div>
      <div>{user.user.username}</div>
      <div>{user.user.email}</div>
    </div>
  );
};

export default Chat;
