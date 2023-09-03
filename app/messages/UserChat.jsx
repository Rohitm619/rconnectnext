import React, { useState } from "react";
import { useEffect } from "react";
import useFetchRecipientUser from "@/hooks/useFetchRecipientUser";
import Skeleton from "react-loading-skeleton";

function UserChat({ userChat, userId }) {
  const recipient = useFetchRecipientUser(userChat, userId);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {}, []);

  return recipient ? (
    <>
      {(
        <div className="flex justify-between items-center gap-2 p-2 glass-without-border-radius-hover glass-without-border-radius rounded-lg hover:cursor-pointer">
          <div className="relative flex gap-2">
            <div className="relative rounded-full w-12 h-12 p-0 overflow-hidden border-2 border-[#0E8388]">
              {!imageLoaded && (
                <Skeleton
                  className="w-full h-full top-0 m-0 absolute left-0"
                  highlightColor="rgba(0,0,0,0.5)"
                  baseColor="#0E8388"
                />
              )}
              <img
                src={recipient.profileImage}
                className={`${!imageLoaded ? "hidden" : ""} w-full h-full`}
                alt=""
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            <div className="absolute w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="[&>div]:leading-snug">
              <div className="font-bold text-[#0E8388]">
                {recipient.firstname} {recipient.lastname}
              </div>
              <div className="text-[#CBE4DE]">last message</div>
            </div>
          </div>
          <div className="flex flex-col [&>div]:leading-tight text-sm gap-1">
            <div>11/11/2023</div>
            <div className="flex justify-end">
              <div className="bg-[#0E8388] w-5 h-5 rounded-full flex items-center justify-center">
                2
              </div>
            </div>
          </div>
        </div>
      ) || (
        <div className="flex items-center gap-2 p-2 glass w-[90%]">
          <Skeleton
            className="w-full h-full top-0 m-0 absolute left-0"
            highlightColor="rgba(0,0,0,0.5)"
            baseColor="#0E8388"
          />
        </div>
      )}
    </>
  ) : (
    <div></div>
  );
}

export default UserChat;
