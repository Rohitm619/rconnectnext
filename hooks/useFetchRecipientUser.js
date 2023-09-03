import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchRecipientUser(userChat, userId) {
  const [recipientUser, setRecipientUser] = useState(null);
  const recipientId = userChat?.members.find((id) => id !== userId);

  useEffect(() => {
    const token = localStorage.getItem("jwtoken");
    const fetchRecipient = async () => {
      await axios
        .get(`http://localhost:8080/getuserbyid/${recipientId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setRecipientUser(res.data.user);
        });
    };

    fetchRecipient();
  }, []);
  return recipientUser;
}
