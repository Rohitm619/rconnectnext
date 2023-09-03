import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

function FriendRequests({ userData }) {
  const [pendingFriendsList, setPendingFriendsList] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("jwtoken");
    axios
      .get(`http://localhost:8080/getpendingfriends/${userData.user._id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((resp) => {
        setPendingFriendsList(resp.data);
      })
      .catch((err) => {});
  });

  return (
    <>
      <div className="flex w-full h-full justify-center items-center">
        {pendingFriendsList ? (
          <>
            {pendingFriendsList.length > 0 ? (
              <>
                <div>Friend Request</div>
              </>
            ) : (
              <div className="flex flex-col transition justify-center gap-3 items-center text-[#0E8388]">
                <i class="fa-solid fa-circle-check text-5xl"></i>
                <span className="text-3xl">All caught up!</span>
              </div>
            )}
          </>
        ) : (
          <Skeleton
            className=""
            height={300}
            highlightColor="rgba(0,0,0,0.5)"
            baseColor="#0E8388"
          />
        )}
      </div>
    </>
  );
}

export default FriendRequests;
