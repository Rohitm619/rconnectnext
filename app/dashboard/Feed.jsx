"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import Post from "../Post";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

function Feed({ userData }) {
  const user = userData.user;
  const [myPostLists, setMyPostLists] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getfriendsposts/${user._id}`)
      .then((resp) => setMyPostLists(resp.data.friendsPosts))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deletePost(postId, postName) {
    axios
      .delete(`http://localhost:8080/deletepost/${postId}`)
      .then((res) => {
        const deleteRef = ref(storage, `image/${postName}`);
        deleteObject(deleteRef)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        setAlertSuccessMsg({
          visible: true,
          message: "Post Deleted Successfully!",
        });
        setTimeout(() => {
          setAlertSuccessMsg({
            visible: false,
            message: "",
          });
        }, 1000);
      })
      .catch((err) => {
        setAlertMsg({
          visible: true,
          message: "Something went wrong!",
        });
        setTimeout(() => {
          setAlertMsg({
            visible: false,
            message: "",
          });
        }, 1000);
      });
  }

  return (
    <div className="w-full text-[#CBE4DE] flex flex-col gap-3">
      {myPostLists.length > 0 ? (
        <>
          {myPostLists.map((ele, index) => (
            <Post
              key={index}
              userId={ele.userId}
              caption={ele.caption}
              img={ele.image}
              postId={ele._id}
              postName={ele.imageName}
              deletePost={deletePost}
              isMyPost={false}
            />
          ))}
        </>
      ) : (
        "No posts"
      )}
    </div>
  );
}

export default Feed;
