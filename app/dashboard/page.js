"use client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, hideLoader } from "../auth";
import { easeInOut, motion } from "framer-motion";
import Header from "./Header";
import "./dashboard.css";
import Postsection from "./Postsection";
import Post from "@/backend/model/Post";
import Feed from "./Feed";
import FriendRequests from "./FriendRequests";

function Dashboard() {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
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

  {
    {
      if (loading) return loadingDiv;
    }

    {
      if (authData === false) redirect("/join");
    }

    if (authData && authData.error) {
      redirect("join");
    } else if (authData && authData.data) {
      return (
        <>
          <div className="fluid-container pt-1">
            <div className="sticky z-30 w-screen gradient-bg top-0 pb-1 mb-3">
              <Header userData={authData.data} setLoading={setLoading} />
            </div>
            <div className="grid lg:grid-cols-4 justify-items-center gap-3 px-3">
              <div className="hidden lg:block glass h-80 col-span-1 w-full text-center">
                1
              </div>
              <div className="col-span-2 h-[100%] lg:h-[100vh] overflow-auto flex flex-col gap-2 w-full text-center p-1 scrollbar-hide">
                <Postsection userData={authData.data} />
                <Feed userData={authData.data} />
              </div>
              <div className="hidden lg:block glass h-80 col-span-1 w-full text-center p-2">
                <FriendRequests userData={authData.data} />
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default Dashboard;
