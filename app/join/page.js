"use client";
import React, { useContext, useRef, useState } from "react";
import "./SignUser.css";
import { easeInOut, motion } from "framer-motion";
import axios from "axios";
import { useEffect } from "react";
import { auth } from "../auth";
import userContext from "@/contexts/userContext";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

function SignUser({ signin = true }) {
  const router = useRouter();
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await auth();
      setAuthData(userData);
      setLoading(false)
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


  if (authData && authData.data) redirect("/dashboard");

  //Use ref for login form
  const signInEmailRef = useRef(undefined);
  const signInPasswordRef = useRef(undefined);
  //Use ref for signup form
  const signUpFirstnameRef = useRef(undefined);
  const signUpLastnameRef = useRef(undefined);
  const signUpEmailRef = useRef(undefined);
  const signUpPasswordRef = useRef(undefined);
  const signUpConfirmPasswordRef = useRef(undefined);

  const [isLoginOnPhone, setIsLoginOnPhone] = useState(true)

  const signInDiv = (
    <div className="">
      <h1 className="text-5xl py-3">
        Welcome Back, <br /> Sign in to Rconnect!
      </h1>
    </div>
  );
  const signUpDiv = (
    <div>
      <h1 className=" text-5xl py-3">
        Welcome to Rconnect! <br /> Sign up today!
      </h1>
    </div>
  );
  const signInFormDiv = (
    <>
      <div className="text-center mb-2">
        <h1 className="text-5xl py-2">Sign In</h1>
      </div>
      <div className="w-[60%]">
        <form onSubmit={onSignin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="form-control"
              ref={signInEmailRef}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              ref={signInPasswordRef}
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.2 }}
            className="self-center text-[#fff] px-2.5 py-1 mt-3 bg-[#0E8388] rounded-full cursor-pointer hover:bg-[#CBE4DE] hover:text-[#2E4F4F] active:bg-[#0E8388] active:text-[#CBE4DE] active:shadow active:shadow-[#2E4F4F] transition-all duration-300 w-[30%]"
          >
            <span className="mx-2">Sign In</span>
          </motion.button>
        </form>
      </div>
    </>
  );
  const signUpFormDiv = (
    <>
      <div className="text-center mb-2">
        <h1 className="text-5xl py-2">Sign Up</h1>
      </div>

      <div className="w-fit">
        <form className="grid grid-cols-2 gap-3" onSubmit={onSignup}>
          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="form-control"
              ref={signUpFirstnameRef}
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="form-control"
              ref={signUpLastnameRef}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="form-control"
              ref={signUpEmailRef}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              ref={signUpPasswordRef}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              className="form-control"
              ref={signUpConfirmPasswordRef}
            />
          </div>
          <div className="col-span-2 flex justify-center">
            <motion.button
              whileTap={{ scale: 0.2 }}
              type="submit"
              className="group w-[30%] text-[#fff] px-2.5 py-1 mt-3 bg-[#0E8388] rounded-full cursor-pointer hover:bg-[#CBE4DE] hover:text-[#2E4F4F] active:bg-[#0E8388] active:text-[#CBE4DE] active:shadow active:shadow-[#2E4F4F] transition-all duration-300 "
            >
              <span className="mx-2 group-hover:inline">Sign Up</span>
            </motion.button>
          </div>
        </form>
      </div>
    </>
  );
  const signInFormDivPhone = (
    <>
      <div className="py-3 text-white">
        <motion.div
          animate={{ scale: [1.5, 1] }}
          className="flex flex-col content-center justify-center place-items-center text-center"
        >
          <img src="/letterR.svg" className="w-[20%] mt-[10%] mb-3" alt="" />
          <h1 className="text-5xl py-2">Welcome back to Rconnect!</h1>
        </motion.div>

        <motion.div animate={{ scale: [1.1, 1] }} className="w-[80%] pb-[50%] m-auto">
          <h1 className="text-4xl pt-10 text-center text-white">Sign In</h1>
          <form onSubmit={onSignin} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="form-control"
                ref={signInEmailRef}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                ref={signInPasswordRef}
              />
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.2 }}
              className="self-center text-[#fff] px-2.5 py-1 mt-3 bg-[#0E8388] rounded-full cursor-pointer hover:bg-[#CBE4DE] hover:text-[#2E4F4F] active:bg-[#0E8388] active:text-[#CBE4DE] active:shadow active:shadow-[#2E4F4F] transition-all duration-300 w-[30%]"
            >
              <span className="mx-2">Sign In</span>
            </motion.button>
          </form>
          
          <p className="my-4 cursor-pointer text-center">
                    New to Rconnect?
                    <button
                      className="mx-2 text-blue-700"
                      onClick={() => changeSignOnPhone()}
                    >
                      Sign up
                    </button>
                  </p>
        </motion.div>
      </div>
    </>
  );
  const signUpFormDivPhone = (
    <>
      <div className="py-3 text-white">
        <motion.div
          animate={{ scale: [1.5, 1] }}
          className="flex flex-col content-center justify-center place-items-center text-center"
        >
          <img src="/letterR.svg" className="w-[20%] mt-[10%] mb-3" alt="" />
          <h1 className="text-5xl py-2">Welcome to Rconnect!</h1>
        </motion.div>

        <motion.div animate={{ scale: [1.1, 1] }} className="w-[80%] pb-[50%] m-auto">
          <h1 className="text-4xl py-10 text-center text-white">Sign Up</h1>
        <form className="grid grid-cols-2 gap-3" onSubmit={onSignup}>
          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="form-control"
              ref={signUpFirstnameRef}
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="form-control"
              ref={signUpLastnameRef}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="form-control"
              ref={signUpEmailRef}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              ref={signUpPasswordRef}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              className="form-control"
              ref={signUpConfirmPasswordRef}
            />
          </div>
          <div className="col-span-2 flex justify-center">
            <motion.button
              whileTap={{ scale: 0.2 }}
              type="submit"
              className="group w-[30%] text-[#fff] px-2.5 py-1 mt-3 bg-[#0E8388] rounded-full cursor-pointer hover:bg-[#CBE4DE] hover:text-[#2E4F4F] active:bg-[#0E8388] active:text-[#CBE4DE] active:shadow active:shadow-[#2E4F4F] transition-all duration-300 "
            >
              <span className="mx-2 group-hover:inline">Sign Up</span>
            </motion.button>
          </div>
        </form>
      
          
          <p className="my-4 cursor-pointer text-center">
                    Already Rconnect member?
                    <button
                      className="mx-2 text-blue-700"
                      onClick={() => changeSignOnPhone()}
                    >
                      Sign in
                    </button>
                  </p>
        </motion.div>
      </div>
    </>
  );

  const [isSignIn, setIsSignIn] = useState(signin);
  const [animateDiv, setFinalDiv] = useState(
    isSignIn ? { x: "100%" } : { x: 0 }
  );
  const initialDiv = isSignIn ? { x: "100%" } : { x: 0 };
  const [signDiv, setSignDiv] = useState(isSignIn ? signInDiv : signUpDiv);

  function changeSign() {
    setIsSignIn(!isSignIn);
    if (isSignIn) {
      setFinalDiv({ x: 0 });
      setSignDiv(signUpDiv);
    } else {
      setFinalDiv({ x: "100%" });
      setSignDiv(signInDiv);
    }
  }

  function changeSignOnPhone(){
    setIsLoginOnPhone(!isLoginOnPhone)
  }

  function onSignin(e) {
    document.getElementById("loading-div").style.display = "flex"
    e.preventDefault();

    axios
      .post("http://localhost:8080/signin", {
        email: signInEmailRef.current.value,
        password: signInPasswordRef.current.value,
      })
      .then(
        (response) => {
          localStorage.setItem("jwtoken", response.data.token);
          router.push("/dashboard");
        },
        (error) => {}
      );
  }
  function onSignup(e) {
    e.preventDefault();

    if (
      signUpPasswordRef.current.value === signUpConfirmPasswordRef.current.value
    )
      axios
        .post("http://localhost:8080/signup", {
          firstname: signUpFirstnameRef.current.value,
          lastname: signUpLastnameRef.current.value,
          email: signUpEmailRef.current.value,
          password: signUpPasswordRef.current.value,
          profileImage: "",
          friendList: [],
          pendingFriendList: [],
        })
        .then(
          (response) => {
            console.log(response);
            changeSign();
            changeSignOnPhone()
          },
          (error) => {}
        );
  }

  return (
    <>
    {loadingDiv}
      <div className="hidden lg:block main-bg bg-cover">
        <div className="grid h-[100%] lg:grid-cols-2 text-white">
          <div className="lg:col-span-1 h-screen flex flex-col gap-2 justify-center items-center">
            {isSignIn ? signInFormDiv : ""}
          </div>

          <motion.div
            initial={initialDiv}
            animate={animateDiv}
            className="absolute w-50 h-100 flex-col flex items-center justify-center p-5 "
          >
            <div className="w-fit">
              <img src="/letterR.svg" className="w-[10%] mb-3" alt="" />

              <img
                src="https://storyset.com/illustration/social-media/amico/animate?share=68546"
                alt=""
              />

              {signDiv}
              {isSignIn ? (
                <>
                  <p className="my-2 cursor-pointer">
                    New to Rconnect?
                    <button
                      className="mx-2 text-blue-700"
                      onClick={() => changeSign()}
                    >
                      Sign up
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <p className="my-2 cursor-pointer">
                    Already Rconnect member?
                    <button
                      className="mx-2 text-blue-700"
                      onClick={() => changeSign()}
                    >
                      Sign in
                    </button>
                  </p>
                </>
              )}
            </div>
          </motion.div>

          <div className="lg:col-span-1 flex flex-col gap-2 justify-center items-center w-full">
            {!isSignIn ? signUpFormDiv : ""}
          </div>
        </div>
      </div>

      <div className="lg:hidden main-bg bg-cover">
      {loadingDiv}
        <div>{isLoginOnPhone ? signInFormDivPhone : signUpFormDivPhone}</div>
      </div>
    </>
  );
}

export default SignUser;
