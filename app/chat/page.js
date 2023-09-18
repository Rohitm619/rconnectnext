"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io.connect("http://localhost:8080");
import { motion } from "framer-motion";
import { v4 } from "uuid";

console.log(socket.ids);
console.log(socket.id);
const myID = v4();

function Anuroh() {
  console.log(myID);

  const [msgList, setMsgList] = useState([]);
  const [myMsg, setMyMsg] = useState({});

  useEffect(() => {}, [socket]);

  socket.on("recieve_message", (data) => {
    setMsgList([...msgList, data]);
    const scrollDiv = document.getElementById("scrollDiv");
    scrollDiv.scrollTop = scrollDiv.offsetHeight;
  });

  function setMsg(e) {
    setMyMsg({ user: myID, msg: e.target.value });
  }

  function sendMsg(e) {
    e.preventDefault();
    socket.emit("send_message", myMsg);

    setMsgList([...msgList, myMsg]);
    setMyMsg({ user: myID, msg: "" });
    const scrollDiv = document.getElementById("scrollDiv");
    scrollDiv.scrollTop = scrollDiv.offsetHeight;
  }

  return (
    <div className="w-screen h-screen text-white flex flex-col justify-center items-center gap-3">
      <div className="h-[80vh] w-[80vw]">
        <div
          className="overflow-auto w-full h-[80vh] text-center items-center px-3"
          id="scrollDiv"
        >
          {msgList.map((ele, index) => {
            return (
              <div
                className={`flex ${
                  ele.user === myID ? "justify-end" : "justify-start"
                }`}
              >
                <p
                  className={`${
                    ele.user === myID
                      ? "bg-green-200 w-max text-green-700 rounded-tl-lg rounded-tr-lg rounded-bl-lg py-1"
                      : "bg-purple-200 w-max text-purple-700 rounded-tl-lg rounded-tr-lg rounded-br-lg py-1"
                  } px-2`}
                  key={index}
                >
                  {ele.msg}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="">
        <form onSubmit={sendMsg} className="flex gap-3">
          <input
            type="text"
            onChange={setMsg}
            value={myMsg.msg}
            className="rounded text-black px-2"
            required
          />
          <motion.input
            type="submit"
            value="Send"
            whileTap={{ scale: 0.9 }}
            className="bg-sky-200 text-sky-700 border-sky-700 rounded px-2 py-1"
          />
        </form>
      </div>
    </div>
  );
}

export default Anuroh;
