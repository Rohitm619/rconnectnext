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
  }, [deletePost]);

  function deletePost(postId) {
    axios
      .delete(`http://localhost:8080/deletepost/${postId}`)
      .then((res) => {
        alert("post deleted");
      })
      .catch((err) => {
        alert("something went wrongg!");
      });
  }

  return (
    <>
      <div className="flex flex-col gap-2 lg:h-[100%] lg:overflow-auto px-2">
        {myPostLists.map((ele, index) => (
          <Post
            key={index}
            userName={`${user.firstname} ${user.lastname}`}
            userImage={user.profileImage}
            caption={ele.caption}
            img={ele.image}
            postId={ele._id}
            deletePost={deletePost}
            isMyPost={true}
          />
        ))}
      </div>
    </>
  );
}

export default MyPosts;
