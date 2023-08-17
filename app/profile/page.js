"use client";
import React, { useEffect, useRef, useState } from "react";
import { auth, updateUser } from "../auth";
import Header from "../dashboard/Header";
import { easeInOut, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useWindowSize } from "@uidotdev/usehooks";
import Confetti from "react-confetti";
import axios from "axios";
import FileResizer from "react-image-file-resizer";

function Profile() {
  const router = useRouter();
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [alertMsg, setAlertMsg] = useState({ visible: false, message: "" });
  const [alertSuccessMsg, setAlertSuccessMsg] = useState({
    visible: false,
    message: "",
  });
  const [profileImg64, setProfileImg64] = useState();

  const profileFirstName = useRef();
  const profileLastName = useRef();
  const profileImage = useRef();

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

  useEffect(() => {
    const fetchData = async () => {
      const userData = await auth();
      setAuthData(userData);

      setLoading(false);
    };

    fetchData();
  }, [auth]);

  const loadingDiv = (
    <>
      <div
        id="loading-div"
        className={`${
          loading ? "" : "hidden"
        } w-screen h-screen fixed z-50 loading-screen flex items-center justify-center`}
      >
        <motion.img
          src="/letterR.svg"
          className="w-[10%] lg:w-[5%]"
          alt=""
          animate={{ scale: [1.2, 1.2, 1, 1.2, 1, 1.2, 1.2] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: easeInOut,
          }}
        />
      </div>
    </>
  );

  function saveChanges() {
    setIsDisabled(true);
    const pathData = async () => {
      await updateUser(authData.data.user._id, {
        firstname: profileFirstName.current.value,
        lastname: profileLastName.current.value,
      });

      const userData = await auth();
      setAuthData(userData);
    };

    const resp = pathData();
    if (resp.error) {
      setAlertMsg({ visible: true, message: "Something went wrong!" });
      setTimeout(() => {
        setAlertMsg({ visible: false, message: "" });
      }, 3000);
    } else {
      setAlertSuccessMsg({ visible: true, message: "Profile Updated!" });
      setTimeout(() => {
        setAlertSuccessMsg({ visible: false, message: "" });
      }, 3000);
    }
  }

  function updateProfilePic(e) {
    const token = localStorage.getItem("jwtoken");
    const updateImg = async () => {
      FileResizer.imageFileResizer(
        e.target.files[0],
        200,
        200,
        "JPEG",
        100,
        0,
        (base64Img) => {
          console.log("bs64 in function");
          console.log(base64Img);
          setProfileImg64(base64Img);

          axios.patch(
            `http://localhost:8080/updateuser/${authData.data.user._id}`,
            {
              profileImage: base64Img,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );
        },
        "base64"
      );
      document.getElementById("editBtn").click();
      setTimeout(() => {
        document.getElementById("saveBtn").click();
      }, 1000);
    };
    updateImg();
  }

  {
    if (loading) return loadingDiv;
  }

  return authData && authData.data ? (
    <>
      {alertDiv}
      {alertSuccessDiv}
      <Header userData={authData.data} setLoading={setLoading} />
      <div className="grid grid-cols-2 p-3 gap-2">
        <div className="flex flex-col justify-center content-center p-2">
          <div className="text-center">
            <span
              className="text-[#0E8388] font-bold text-3xl"
              style={{ textShadow: "0 0 4px #0E8388" }}
            >
              Recent Posts
            </span>
          </div>
          <div className="glass mt-3 p-1">Mypost</div>
        </div>
        <div className="flex flex-col justify-center content-center p-2">
          <div className="text-center">
            <span
              className="text-[#0E8388] font-bold text-3xl"
              style={{ textShadow: "0 0 4px #0E8388" }}
            >
              My Profile
            </span>
          </div>
          <div className="glass mt-3 flex gap-4 justify-around p-4">
            <div className="relative inline-block">
              <motion.div className="group relative w-52 mx-auto rounded-full overflow-hidden border-[#0E8388] border-4">
                <div
                  className="bg-[rgba(0,0,0,0.5)] text-white cursor-pointer w-full h-full absolute group-hover:flex hidden"
                  onClick={() => document.getElementById("profilePic").click()}
                >
                  <div className="m-auto flex flex-col items-center gap-2 text-xl text-center">
                    <i className="fa-solid fa-pen-to-square"></i>
                    <span className="">Change profile image</span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    id="profilePic"
                    onChange={updateProfilePic}
                  />
                </div>
                <img
                  src={authData.data.user.profileImage}
                  alt="Profile Image"
                  className="block h-[200px] w-[200px]"
                />
              </motion.div>
            </div>
            <form className=" w-[60%]">
              <div className="grid grid-cols-2 gap-3 text-[#CBE4DE]">
                <motion.div
                  className="col-span-2 ml-auto bg-[#0E8388] py-1 px-2 rounded hover:bg-[#CBE4DE] hover:text-[#0E8388] hover:cursor-pointer transition"
                  whileTap={{ scale: 0.9 }}
                >
                  {isDisabled ? (
                    <div onClick={() => setIsDisabled(false)} id="editBtn">
                      <i className="fa-solid fa-pen-to-square mr-1"></i> Edit
                    </div>
                  ) : (
                    <div onClick={() => saveChanges()} id="saveBtn">
                      <i className="fa-solid fa-floppy-disk mr-1"></i>
                      Save
                    </div>
                  )}

                  {/* <span className="">Edit profile</span> */}
                </motion.div>
                <div>
                  <label htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    className="form-control"
                    defaultValue={authData.data.user.firstname}
                    ref={profileFirstName}
                    disabled={isDisabled}
                  />
                </div>
                <div>
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    className="form-control"
                    defaultValue={authData.data.user.lastname}
                    ref={profileLastName}
                    disabled={isDisabled}
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="email">
                    Email
                    <span className="mx-2 text-red-500 text-sm italic text-center align-middle">
                      ( cannot edit this field )
                    </span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    defaultValue={authData.data.user.email}
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  ) : (
    router.push("/")
  );
}

export default Profile;
