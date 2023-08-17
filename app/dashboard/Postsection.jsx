import React from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useState } from "react";
import { resizeImage } from "../miscfuncs";

function Postsection({ userData }) {
  const userFriends = userData.user.friendList;
  const [postingImg64, setPostingImg64] = useState();
  const [showPostMaker, setShowPostMaker] = useState(false);
  const [showImgCropper, setShowImgCropper] = useState(true);

  function convertToBase62(e) {
    // resizeImage(e.target.files[0])
    //   .then((resizedBase64) => {
    //     console.log(resizedBase64);
    //     setPostingImg64(resizedBase64);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPostingImg64(reader.result);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  }

  function switchPostMaker() {
    setShowPostMaker(!showPostMaker);
  }

  function sharePost() {
    console.log("shared");
  }

  const postMaker = (
    <div
      className="w-screen h-screen fixed z-50 bg-[rgba(0,0,0,0.5)] left-0 top-0 flex justify-center items-center text-white"
      onClick={switchPostMaker}
    >
      <div
        className="bg-[#CBE4DE] lg:w-2/5 w-4/5 rounded-xl lg:p-5 p-4 lg:h-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[90%] overflow-auto">
          <div className="flex content-center gap-3 justify-between pr-5 pb-3 sticky top-0 z-40 bg-[#CBE4DE]">
            <div className="flex gap-3">
              <img
                src={userData.user.profileImage}
                className="h-14 w-14 rounded-full"
                style={{ border: "2px solid #0E8388" }}
                alt=""
              />
              <div className="flex flex-col text-left text-[#0E8388]">
                <span className="my-0 font-bold text-lg">
                  {userData.user.firstname} {userData.user.lastname}
                </span>
                <p className="my-0">Post to Friends</p>
              </div>
            </div>
            <div>
              <i
                className="fas fa-solid fa-xmark text-2xl text-[#0E8388] cursor-pointer"
                onClick={switchPostMaker}
              ></i>
            </div>
          </div>
          <div className="mt-3 flex flex-col glass-without-shadow items-center overflow-auto">
            <div className="w-full">
              <textarea
                name=""
                placeholder="What do you want to share?"
                className="bg-transparent resize-none border-sm outline-none text-[#2E4F4F] p-3 w-[100%]"
                id=""
                rows="8"
              ></textarea>
              <hr className="w-[90%] mx-auto my-1 text-[#0E8388]" />
              {postingImg64 ? (
                <>
                  <img src={postingImg64} className="w-fit m-auto" alt="" />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="text-[#CBE4DE] px-3 py-1 inline-block bg-[#0E8388] rounded-full hover:bg-[#CBE4DE] hover:text-[#2E4F4F] active:bg-[#0E8388] active:text-[#CBE4DE] active:shadow active:shadow-[#2E4F4F] transition-all duration-300 mt-3"
          >
            <label htmlFor="postImage" className="cursor-pointer">
              <i className="fa-solid fa-image"></i> &nbsp;Add Image
            </label>
            <input
              type="file"
              id="postImage"
              name="postImage"
              className="hidden"
              onChange={convertToBase62}
            />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={sharePost}
            className="text-[#CBE4DE] px-3 py-1 inline-block bg-[#0E8388] rounded-full hover:bg-[#CBE4DE] hover:text-[#2E4F4F] active:bg-[#0E8388] active:text-[#CBE4DE] active:shadow active:shadow-[#2E4F4F] transition-all duration-300 mt-3"
          >
            <i className="fa-solid fa-paper-plane"></i> &nbsp;Share
          </motion.div>
        </div>
        <hr className="text-[#0E8388]" />
      </div>
    </div>
  );

  return (
    <>
      {showPostMaker ? <>{postMaker}</> : ""}

      <div>
        <div className="w-full rounded-xl py-1 glass px-3 pt-3">
          <div className="flex justify-center gap-4 content-center">
            <div>
              <img
                src={userData.user.profileImage}
                className="h-11 w-11 border border-[#CBE4DE] overflow-hidden rounded-full"
                alt=""
              />
            </div>
            <div
              className="text-left bg-[#CBE4DE] py-2.5 px-3 text-[#0E8388] rounded-full cursor-pointer w-[90%]"
              onClick={switchPostMaker}
            >
              Share your thoughts...
            </div>
          </div>
          {/* {postingImg64 ? (
            <div className="p-auto">
              <img src={postingImg64} alt="" className="m-auto w-3/4" />
            </div>
          ) : (
            ""
          )} */}

          <div className="flex gap-3 justify-between content-center pt-4 mb-3 relative w-full">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="text-[#CBE4DE] px-2.5 py-1 bg-[#0E8388] rounded-full hover:bg-[#CBE4DE] hover:text-[#2E4F4F] active:bg-[#0E8388] active:text-[#CBE4DE] active:shadow active:shadow-[#2E4F4F] transition-all duration-300"
            >
              <label htmlFor="postImage" className="cursor-pointer">
                <i className="fa-solid fa-image"></i> &nbsp;Add Image
              </label>
              <input
                type="file"
                id="postImage"
                name="postImage"
                className="hidden"
                onChange={convertToBase62}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Postsection;
