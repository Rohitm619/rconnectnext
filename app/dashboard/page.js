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
          <div className="BodyComponent fluid-container pt-1">
            <div className="mb-3">
              <Header userData={authData.data} setLoading={setLoading} />
            </div>
            <div className="grid lg:grid-cols-4 justify-items-center gap-3 px-3">
              <div className="hidden lg:block glass h-80 col-span-1 w-full text-center">
                1
              </div>
              <div className="col-span-2 w-full text-center p-1">
                <Postsection userData={authData.data} />
              </div>
              <div className="hidden lg:block glass h-80 col-span-1 w-full text-center">
                3
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default Dashboard;
