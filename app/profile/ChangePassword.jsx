import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function ChangePassword() {
  const router = useRouter();
  const currentPassword = useRef();
  const newPassword = useRef();
  const confirmNewPassword = useRef();
  const [alertMsg, setAlertMsg] = useState({ visible: false, message: "" });
  const [alertSuccessMsg, setAlertSuccessMsg] = useState({
    visible: false,
    message: "",
  });

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

  function changePassword() {
    if (newPassword.current.value !== confirmNewPassword.current.value) {
      setAlertMsg({ visible: true, message: "New passwords do not match!" });
      setTimeout(() => {
        setAlertMsg({ visible: false, message: "" });
      }, 3000);
    } else {
      const updatePass = async () => {
        const token = localStorage.getItem("jwtoken");
        await axios
          .patch(
            "http://localhost:8080/changepassword",
            {
              currentPassword: currentPassword.current.value,
              newPassword: newPassword.current.value,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((result) => {
            setAlertSuccessMsg({
              visible: true,
              message: "Password Changed Successfully! Please login again.",
            });
            setTimeout(() => {
              setAlertSuccessMsg({ visible: false, message: "" });
              localStorage.removeItem("jwtoken");
              router.push("/join");
            }, 3000);
          })
          .catch((error) => {
            setAlertMsg({
              visible: true,
              message: error.response.data.message,
            });
            setTimeout(() => {
              setAlertMsg({ visible: false, message: "" });
            }, 3000);
          });
      };
      updatePass();
    }
  }
  return (
    <>
      {alertDiv}
      {alertSuccessDiv}
      <div className="flex flex-col gap-2 w-[100%]">
        <div className="">
          <label htmlFor="password">Current Password</label>
          <input
            type="password"
            name="password"
            placeholder="Current Password"
            className="form-control"
            ref={currentPassword}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="form-control"
            ref={newPassword}
          />
        </div>
        <div className="">
          <label htmlFor="confirmNewPass">Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPass"
            placeholder="Confirm New Password"
            className="form-control"
            ref={confirmNewPassword}
          />
        </div>

        <div>
          <motion.div
            className="group col-span-3 mt-3 bg-[#0E8388] text-[#CBE4DE] py-1 px-2 rounded hover:shadow-lg inline-block float-right hover:cursor-pointer transition"
            whileTap={{ scale: 0.9 }}
            onClick={changePassword}
          >
            Change Password
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
