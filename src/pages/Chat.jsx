import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/chatProvider";
import axios from "axios";
const Chat = () => {
  const { user } = ChatState();
  const [NoteCloud, setNoteCloud] = useState("");
  // const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    try {
      axios("http://localhost:5000/api/user/signin/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setNoteCloud(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
    console.log("useeffect");
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>hello</div>
      <div>{NoteCloud.username}</div>
      <div>{user.user.email}</div>
    </div>
  );
};

export default Chat;
