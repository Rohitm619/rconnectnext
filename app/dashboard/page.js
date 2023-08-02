"use client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, hideLoader } from "../auth";
import { easeInOut, motion } from "framer-motion";

function Dashboard() {
  const router = useRouter();
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

  function signOut() {
    localStorage.removeItem("jwtoken");
    router.push("/join");
  }

  {
    {
      if (loading) return loadingDiv;
    }

    {
      if (authData === false) redirect("/join");
    }

    if (authData && authData.error) {
      console.log("gone into error");
      redirect("join");
    } else if (authData && authData.data) {
      return (
        <div className="text-black">
          <button className="btn btn-primary" onClick={signOut}>
            Sign Out
          </button>
          {`Welocome ${authData.data.user.firstname}`}
        </div>
      );
    }
  }
}

export default Dashboard;
