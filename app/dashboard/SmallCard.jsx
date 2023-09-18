import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

function SmallCard({ users, updateFriendList, userData }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {
        <div className="flex flex-col w-[100%] max-h-[70vh] overflow-auto p-2 px-3 gap-3 text-white left-0 top-10 lg:glass-without-border-radius rounded-md">
          {users.map((ele, index) => (
            <div key={index} className="relative flex justify-between">
              <div className="flex gap-2 items-center">
                <div className="relative rounded-full w-12 h-12 p-0 overflow-hidden border-2 border-[#0E8388]">
                  {!imageLoaded && (
                    <Skeleton
                      className="w-full h-full top-0 m-0 absolute left-0"
                      highlightColor="rgba(0,0,0,0.5)"
                      baseColor="#0E8388"
                    />
                  )}
                  <img
                    src={ele.profileImage}
                    className={`${!imageLoaded ? "hidden" : ""} w-full h-full`}
                    alt=""
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
                <div className="[&>div]:leading-snug">
                  <div className="font-bold text-[#0E8388] text-left">
                    {ele.firstname} {ele.lastname}
                  </div>
                  <div className="text-[#CBE4DE] text-left">{ele.email}</div>
                </div>
              </div>
              <div className="flex gap-1 items-center cursor-pointer">
                {/* <i className="fa-solid fa-user-plus bg-[#CBE4DE] text-[#2E4F4F] p-2 rounded"></i> */}
                <div className="flex items-center bg-red-200 w-7 h-7 text-red-700 p-1 hover:shadow-sm hover:shadow-red-700 rounded justify-center">
                  <i className="fa-solid fa-xmark"></i>
                </div>
                <div
                  className="flex items-center bg-[#CBE4DE] w-7 h-7 text-[#2E4F4F] hover:shadow-sm hover:shadow-[#2E4F4F] p-1 rounded justify-center"
                  onClick={() => updateFriendList(ele.email, ele._id)}
                >
                  <i className="fa-solid fa-check"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
}

export default SmallCard;
