import Post from "../Post";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

function MyPosts({ user }) {
  const [myPostLists, setMyPostLists] = useState([]);
  useEffect(() => {
    const fetchMyPosts = async () => {
      await axios
        .get(`http://localhost:8080/getuserposts/${user._id}`)
        .then((resp) => {
          setMyPostLists(resp.data.posts);
        });
    };

    fetchMyPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        {myPostLists.map((ele, index) => (
          <Post
            key={index}
            userName={`${user.firstname} ${user.lastname}`}
            userImage={user.profileImage}
            caption={ele.caption}
            img={ele.image}
          />
        ))}
      </div>
    </>
  );
}

export default MyPosts;
