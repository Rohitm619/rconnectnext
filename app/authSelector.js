import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { easeInOut, motion } from "framer-motion";

function AuthSelector({ authSelect }) {
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

  return <>{loadingDiv}{authSelect.data ? redirect("/dashboard") : redirect("/join")}</>;
}

export default AuthSelector;
