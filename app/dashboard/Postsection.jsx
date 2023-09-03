import React from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useState } from "react";
import { resizeImage } from "../miscfuncs";

import axios from "axios";
import FileResizer from "react-image-file-resizer";
import { storage } from "../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function Postsection({ userData }) {
  const user = userData.user;
  const [postingImg, setPostingImg] = useState();
  const [showPostMaker, setShowPostMaker] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imgLink, setImgLink] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);

  const uploadImg = (file) => {};

  const [alertMsg, setAlertMsg] = useState({ visible: false, message: "" });
  const [alertSuccessMsg, setAlertSuccessMsg] = useState({
    visible: false,
    message: "",
  });
  const captionRef = useRef();

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

  function switchPostMaker() {
    setShowPostMaker(!showPostMaker);
  }

  function setUploadedUrl() {
    const imgName = postingImg.name + v4();
    const imgRef = ref(storage, `image/${imgName}`);
    uploadBytes(imgRef, postingImg)
      .then(() => {
        getDownloadURL(imgRef)
          .then((url) => {
            axios
              .post("http://localhost:8080/addpost", {
                image: String(url),
                caption: captionRef.current.value,
                userId: user._id,
                imageName: imgName,
              })
              .then((response) => {
                setShowPostMaker(false);
                setAlertSuccessMsg({
                  visible: true,
                  message: "Post successfully!",
                });
                setTimeout(() => {
                  setAlertSuccessMsg({ visible: false, message: "" });
                }, 1000);
              })
              .catch((err) => {
                setShowPostMaker(false);
                setAlertMsg({
                  visible: true,
                  message: "Something went wrong!",
                });
                setTimeout(() => {
                  setAlertMsg({ visible: false, message: "" });
                }, 1000);
              });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  function compressImg(e) {
    setPostingImg(e.target.files[0]);
  }

  const postMaker = (
    <div
      className="w-screen h-screen fixed z-40 bg-[rgba(0,0,0,0.5)] left-0 top-0 flex justify-center items-center text-white"
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
                ref={captionRef}
                required
              ></textarea>
              <hr className="w-[90%] mx-auto my-1 text-[#0E8388]" />
              {postingImg ? (
                <div className="h-[20vh]">
                  <img
                    src={URL.createObjectURL(postingImg)}
                    className="w-fit m-auto"
                    alt=""
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="text-[#CBE4DE] px-3 py-1 inline-block bg-[#0E8388] rounded-full active:bg-[#0E8388] active:text-[#CBE4DE] active:shadow active:shadow-[#2E4F4F] transition-all duration-300 mt-3"
          >
            <label htmlFor="postImage" className="cursor-pointer">
              <i className="fa-solid fa-image"></i> &nbsp;Add Image
            </label>
            <input
              type="file"
              id="postImage"
              name="postImage"
              className="hidden"
              onChange={compressImg}
              accept="image/jpg, image/jpeg, image/png"
            />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.9 }}
            onClick={setUploadedUrl}
            className="text-[#CBE4DE] cursor-pointer px-3 py-1 inline-block bg-[#0E8388] rounded-full  active:shadow active:shadow-[#2E4F4F] transition-all duration-300 mt-3"
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
      {alertDiv}
      {alertSuccessDiv}
      {showPostMaker ? <>{postMaker}</> : ""}

      <div className="">
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

          <div className="flex gap-3 justify-between content-center pt-4 mb-3 relative w-full">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="text-[#CBE4DE] px-2.5 py-1 bg-[#0E8388] rounded-full hover:bg-[#CBE4DE] hover:text-[#2E4F4F] active:bg-[#0E8388] active:text-[#CBE4DE] active:shadow active:shadow-[#2E4F4F] transition-all duration-300"
            >
              <span className="cursor-pointer" onClick={switchPostMaker}>
                <i className="fa-solid fa-image"></i> &nbsp;Add Image
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Postsection;
