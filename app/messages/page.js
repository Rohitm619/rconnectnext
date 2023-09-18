"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Header from "../dashboard/Header";
import UserChat from "./UserChat";
import { auth } from "../auth";
import { motion, easeInOut } from "framer-motion";
const socket = io.connect("http://localhost:8080");
import { v4 } from "uuid";

function page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createChat = useState(
    searchParams.get("createchat") ? searchParams.get("createchat") : null
  );
  const [userChats, setUserChats] = useState();
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // socket.on("recieve_message", (data) => {
    //   alert(data.message);
    // });
    const fetchData = async () => {
      const userData = await auth();
      if (userData.data)
        await axios
          .get(
            `http://localhost:8080/chats/findchats/${userData.data.user._id}`
          )
          .then((res) => {
            setUserChats(res.data);
          });
      setAuthData(userData);
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

  if (authData === null) {
    return <>{loadingDiv}</>;
  }

  if (authData && authData.data) {
    return (
      <div className="w-screen">
        <Header userData={authData.data} setLoading={setLoading} />

        <div className="grid grid-cols-3 justify-center w-screen">
          <div className="text-white col-span-1 flex justify-left px-5 py-5">
            {userChats && userChats.length > 0 ? (
              <div className="w-full">
                <div>UserChats</div>
                <div className="w-full flex flex-col gap-2">
                  {userChats.map((ele, index) => (
                    <UserChat
                      key={index}
                      userChat={ele}
                      userId={authData.data.user._id}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="text-white col-span-2 flex justify-center py-5">
            Chat box
          </div>
        </div>
      </div>
    );
  }

  router.push("/");
}

export default page;
