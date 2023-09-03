import Post from "../Post";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { storage } from "../Firebase";
import { ref, deleteObject } from "firebase/storage";
import { motion } from "framer-motion";

function MyPosts({ user }) {
  const [myPostLists, setMyPostLists] = useState([]);
  const [alertMsg, setAlertMsg] = useState({ visible: false, message: "" });
  const [alertSuccessMsg, setAlertSuccessMsg] = useState({
    visible: false,
    message: "",
  });

  useEffect(() => {
    const fetchMyPosts = async () => {
      await axios
        .get(`http://localhost:8080/getuserposts/${user._id}`)
        .then((resp) => {
          setMyPostLists(resp.data.posts);
        });
    };

    fetchMyPosts();
  }, [alertSuccessMsg]);

  console.log("my post ");

  const alertDiv = (
    <motion.div
      className={`${
        !alertMsg.visible ? "hidden" : ""
      } z-40 fixed left-[50%] -translate-x-1/2 top-10`}
      role="alert"
    >
      <div className="bg-red-100 border flex border-red-400 text-red-700 px-3 py-2 rounded">
        <strong className="font-bold">{alertMsg.message}</strong>
        {/* <span className="block sm:inline">Something seriously bad happened.</span> */}
        <span
          className="top-0 bottom-0 right-0"
          onClick={() => setAlertMsg({ visible: false, message: "" })}
        >
          <svg
            className="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    </motion.div>
  );
  const alertSuccessDiv = (
    <motion.div
      className={`${
        !alertSuccessMsg.visible ? "hidden" : ""
      } z-40 fixed left-[50%] -translate-x-1/2 top-10`}
      role="alert"
    >
      <div className="bg-teal-100 border flex border-teal-500 text-teal-900 px-3 py-2 rounded">
        <strong className="font-bold">{alertSuccessMsg.message}</strong>
        {/* <span className="block sm:inline">Something seriously bad happened.</span> */}
      </div>
    </motion.div>
  );

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
    <>
      {alertDiv}
      {alertSuccessDiv}
      <div className="flex flex-col gap-2 lg:h-[100%] lg:overflow-auto px-2">
        {myPostLists.length === 0 ? (
          <>
            <div className="flex glass flex-col justify-center items-center py-5 text-3xl text-[EEEEEE]">
              <span className="text-6xl">
                <i className="fa-regular fa-face-frown-open"></i>
              </span>
              <span className="mt-2">No posts yet!</span>
            </div>
          </>
        ) : (
          myPostLists.map((ele, index) => (
            <Post
              key={index}
              userName={`${user.firstname} ${user.lastname}`}
              userImage={user.profileImage}
              caption={ele.caption}
              img={ele.image}
              postId={ele._id}
              postName={ele.imageName}
              deletePost={deletePost}
              isMyPost={true}
            />
          ))
        )}
      </div>
    </>
  );
}

export default MyPosts;
