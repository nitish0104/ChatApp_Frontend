import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/chatProvider";
import axios from "axios";
import { useParams } from "react-router-dom";
const Chat = () => {
  const { user } = ChatState();
  const [NoteCloud, setNoteCloud] = useState("");
  // const [refresh, setrefresh] = useState(false);

  const { id } = useParams();
  useEffect(
    (id) => {
      console.log(id);
    },
    [id]
  );

  // useEffect(() => {
  //   try {
  //     axios("http://localhost:5000/api/user/signin/", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //       .then((res) => {
  //         setNoteCloud(res.data);
  //         console.log(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   console.log("useeffect");
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div className="text-black text-center text-4xl  font-semibold">
      Now showing post {id}
    </div>
  );
};

export default Chat;
