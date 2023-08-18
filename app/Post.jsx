import React from "react";

function Post({ userName, userImage, caption, img }) {
  return (
    <div className="border bg-[#CBE4DE] rounded-xl overflow-hidden p-3">
      <div className="flex items-center gap-2">
        <div className="rounded-full overflow-hidden border-2 border-[#0E8388]">
          <img src={userImage} className="w-10 h-10" alt="" />
        </div>
        <div className="text-[#0E8388] flex flex-col">
          <span className="text-lg font-extrabold">{userName}</span>
          <span>Public</span>
        </div>
      </div>
      <div>{caption}</div>
      <div>
        <img src={img} alt="" />
      </div>
    </div>
  );
}

export default Post;
