"use client";
import { useEffect, useState } from "react";
import { auth } from "./auth";
import AuthSelector from "./authSelector";
import { easeInOut, motion } from "framer-motion";

export default function Home() {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const userData = await auth();
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

  return (
    <main className="App w-[100%] h-screen">
      {loadingDiv}
      {authData !== null && <AuthSelector authSelect={authData} />}
    </main>
  );
}
