import { motion } from "framer-motion";
import { capitalizeFirstLetter } from "../miscfuncs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

import axios from "axios";

function Header({ userData, setLoading }) {
  const router = useRouter();
  const [userDropDownPos, setUserDropDownPos] = useState(false);
  const [userDropDownPhonePos, setUserDropDownPhonePos] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  function logout() {
    localStorage.removeItem("jwtoken");
    setLoading(true);
    router.push("/join");
  }
  const userName = capitalizeFirstLetter(userData.user.firstname);
  const userProfileImg = userData.user.profileImage;
  // menu variable
  const menu = (
    <>
      <Link href="/dashboard" className="text-white no-underline">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="group text-[#CBE4DE] px-2.5 py-1 bg-[#0E8388] rounded-full cursor-pointer hover:bg-[#CBE4DE] hover:text-[#2E4F4F] active:bg-[#0E8388] active:text-[#CBE4DE] active:shadow active:shadow-[#2E4F4F] transition-all duration-300 "
        >
          <i className="fas fa-regular fa-house"></i>
          <span className="ml-2 group-hover:inline">Home</span>
        </motion.button>
      </Link>
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="group text-[#CBE4DE] px-2.5 py-1 bg-[#0E8388] rounded-full cursor-pointer hover:bg-[#CBE4DE] hover:text-[#2E4F4F] active:bg-[#0E8388] active:text-[#CBE4DE] active:shadow active:shadow-[#2E4F4F] transition-all duration-300"
      >
        <i className="fas fa-regular fa-bell"></i>
        <span className="ml-2 group-hover:inline">Notifications</span>
      </motion.button>
      <Link href="/messages" className="text-white no-underline">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="group text-[#CBE4DE] px-2.5 py-1 bg-[#0E8388] rounded-full cursor-pointer hover:bg-[#CBE4DE] hover:text-[#2E4F4F] active:bg-[#0E8388] active:text-[#CBE4DE] active:shadow active:shadow-[#2E4F4F] transition-all duration-300"
        >
          <i className="fas fa-solid fa-message"></i>
          <span className="ml-2 group-hover:inline">Messages</span>
        </motion.button>
      </Link>
    </>
  );

  async function findUsers(e) {
    let text = e.target.value.trim();
    const token = localStorage.getItem("jwtoken");
    if (text === "") {
      setSearchedUsers(null);
    } else {
      if (text.indexOf(" ") !== -1) {
        const name = text.split(" ");
        // contains spaces
        try {
          await axios
            .get(`http://localhost:8080/getuserbytext/${name[0]}/${name[1]}`, {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
              console.log(res.data);
              setSearchedUsers(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        // text with no spaces
        try {
          await axios
            .get(`http://localhost:8080/getuserbytext/${text}`, {
              headers: {
                Authorization: token,
              },
            })
            .then((res) => {
              setSearchedUsers(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  return (
    <span className="text-sm">
      {/* navbar goes here */}
      <nav className="grid grid-cols-5 lg:grid-cols-11 text-center pt-2 pr-2">
        {/* logo */}
        <div className="col-span-1 flex items-center justify-center">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            src="/letterR.svg"
            className="h-7"
            alt=""
          />
        </div>
        {/* input search */}
        <div className="relative col-span-3 lg:col-span-5 flex justify-center lg:justify-start items-center">
          <input
            type="text"
            className="px-3 text-white glass rounded-xl  border-[#082032] focus:outline-none focus:shadow-none focus:bg-[#334756] lg:w-2/4 h-8"
            placeholder="# Explore"
            onKeyUp={findUsers}
          />

          {searchedUsers ? (
            <div className="absolute flex flex-col lg:w-2/4 max-h-60 overflow-auto p-2 px-3 gap-3 text-white left-0 top-10 glass-without-border-radius rounded-md">
              {searchedUsers.length > 0
                ? searchedUsers.map((ele, index) => (
                    <div key={index} className="relative flex gap-2 ">
                      <div className="relative rounded-full w-12 h-12 p-0 overflow-hidden border-2 border-[#0E8388]">
                        {!imageLoaded && (
                          <Skeleton
                            className="w-full h-full top-0 m-0 absolute left-0"
                            highlightColor="rgba(0,0,0,0.5)"
                            baseColor="#0E8388"
                          />
                        )}
                        <img
                          src={ele.profileImage}
                          className={`${
                            !imageLoaded ? "hidden" : ""
                          } w-full h-full`}
                          alt=""
                          onLoad={() => setImageLoaded(true)}
                        />
                      </div>
                      <div className="[&>div]:leading-snug flex items-center">
                        <div className="font-bold text-[#0E8388]">
                          {ele.firstname} {ele.lastname}
                        </div>
                        {/* <div className="text-[#CBE4DE] text-left">
                          last message
                        </div> */}
                      </div>
                    </div>
                  ))
                : "No results"}
            </div>
          ) : (
            ""
          )}
        </div>
        {/* user profile and menu for desktop */}
        <div className="col-span-1 lg:col-span-5">
          <motion.div className="lg:hidden text-white cursor-pointer">
            <motion.div
              className="flex justify-center items-center"
              onClick={() => setUserDropDownPhonePos(!userDropDownPhonePos)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                src={userProfileImg}
                className="h-9 w-9 border border-[#CBE4DE] overflow-hidden rounded-full"
                alt="Profile Image"
              />
              &nbsp;
              <i className="fas fa-solid fa-caret-down"></i>
            </motion.div>
            <div
              className={`${
                userDropDownPhonePos ? "flex" : "hidden"
              } flex-col glass text-white rounded absolute right-2 top-14 z-30 overflow-hidden`}
            >
              <Link href="/profile" className="text-white no-underline">
                <motion.div
                  className="cursor-pointer p-2 relative w-[100%]"
                  whileHover={{ backgroundColor: "#0E8388", color: "#CBE4DE" }}
                  onClick={() => console.log("kajsbdaks")}
                >
                  <i className="fas fa-solid fa-user"></i> &nbsp; My Profile
                </motion.div>
              </Link>
              <hr className="m-0" />
              <motion.div
                className="cursor-pointer p-2"
                whileHover={{ backgroundColor: "#0E8388", color: "#CBE4DE" }}
                onClick={logout}
              >
                <i className="fas fa-solid fa-right-from-bracket"></i>
                &nbsp;Logout
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className="hidden lg:flex sm:float-right gap-2 items-center"
          >
            <div className="flex float-right gap-2">{menu}</div>
            <motion.div
              className="group flex overflow-hidden rounded-full items-center glass justify-center cursor-pointer"
              onClick={() => setUserDropDownPos(!userDropDownPos)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={userProfileImg}
                className="h-9 w-9 rounded-full"
                alt="Profile Image"
              />
              <span className="text-white mx-2">
                Hi, {userName}
                &nbsp;
                <i className="fas fa-solid fa-caret-down"></i>
              </span>
            </motion.div>
            <div
              className={`${
                userDropDownPos ? "flex" : "hidden"
              } flex-col glass text-white rounded absolute right-2 top-14 z-30 overflow-hidden`}
            >
              <Link href="/profile" className="text-white no-underline">
                <motion.div
                  className="cursor-pointer p-2 relative w-[100%]"
                  whileHover={{ backgroundColor: "#0E8388", color: "#CBE4DE" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fas fa-solid fa-user"></i> &nbsp; My Profile
                </motion.div>
              </Link>
              <hr className="m-0" />
              <motion.div
                className="cursor-pointer p-2"
                whileHover={{ backgroundColor: "#0E8388", color: "#CBE4DE" }}
                whileTap={{ scale: 0.9 }}
                onClick={logout}
              >
                <i className="fas fa-solid fa-right-from-bracket"></i>
                &nbsp;Logout
              </motion.div>
            </div>
          </motion.div>
        </div>
        {/* menu for phones */}
        <motion.div
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          className="lg:hidden col-span-5 flex justify-center mt-3 gap-2"
        >
          {menu}
        </motion.div>
      </nav>
      <hr className="text-white mt-3 lg:hidden" />
    </span>
  );
}

export default Header;
