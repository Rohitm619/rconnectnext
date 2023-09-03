import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { fetchUserById } from "./miscfuncs";
import Skeleton from "react-loading-skeleton";

function Post({
  userName,
  userImage,
  userId,
  caption,
  img,
  postId,
  postName,
  deletePost,
  isMyPost = false,
}) {
  const [showPostOpt, setShowPostOpt] = useState(false);
  const [userById, setUserById] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const user = await fetchUserById(userId);
        setUserById(user);
      };
      fetchData();
    }
  }, []);

  return (
    <div className="glass rounded-xl p-3">
      <div className="flex items-center gap-2">
        <div className="relative rounded-full w-10 h-10 p-0 overflow-hidden border-2 border-[#0E8388]">
          {!imageLoaded && (
            <Skeleton
              className="w-full h-full top-0 m-0 absolute left-0"
              highlightColor="rgba(0,0,0,0.5)"
              baseColor="#0E8388"
            />
          )}
          <img
            src={userById ? userById.profileImage : userImage}
            className={`${!imageLoaded ? "hidden" : ""} w-full h-full`}
            alt=""
          />
        </div>
        <div className="text-[#00ADB5] flex flex-col">
          <span className="text-lg font-extrabold">
            {userById ? (
              <>
                {userById.firstname} {userById.lastname}
              </>
            ) : (
              <> {userName}</>
            )}
          </span>
          <span className="text-left">Public</span>
        </div>
        {isMyPost ? (
          <div className="ml-auto relative">
            <span>
              <i
                className="fa-solid fa-ellipsis-vertical cursor-pointer py-1 px-2.5 hover:bg-[#00ADB5] rounded"
                onClick={() => setShowPostOpt(!showPostOpt)}
              ></i>
            </span>
            {showPostOpt ? (
              <div className="flex-col glass text-white rounded absolute right-2 w-24 z-30 overflow-hidden">
                <span>
                  <div
                    className="cursor-pointer p-1 rounded text-red-500 hover:bg-red-600 hover:text-red-100 flex justify-center items-center"
                    onClick={() => deletePost(postId, postName)}
                  >
                    <i class="fa-solid fa-trash"></i> &nbsp; Delete
                  </div>
                </span>

                <span></span>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <hr className="text-[#0E8388] m-2" />
      <div className="pb-2 text-left">{caption}</div>
      <div>
        {!imageLoaded && (
          <Skeleton
            className=""
            height={200}
            highlightColor="rgba(0,0,0,0.5)"
            baseColor="#0E8388"
          />
        )}
        <img
          src={img}
          className={`${!imageLoaded ? "hidden" : ""} w-[100%]`}
          alt=""
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </div>
  );
}

export default Post;
