"use client";
import React, { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import SmallCard from "./SmallCard";
import { updateUser } from "../auth";
import { useRouter } from "next/navigation";

function FriendRequests({ userData }) {
  const router = useRouter();
  const [pendingFriendsList, setPendingFriendsList] = useState([]);
  const [updateValue, setUpdateValue] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("jwtoken");
    axios
      .get(`http://localhost:8080/getpendingfriends/${userData.user._id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((resp) => {
        resp.data.forEach((ele) => {
          axios
            .get(`http://localhost:8080/getuserbytext/${ele}`, {
              headers: {
                Authorization: token,
              },
            })
            .then((resp) => {
              console.log(pendingFriendsList);
              setPendingFriendsList([...pendingFriendsList, resp.data[0]]);
              console.log(pendingFriendsList);
            });
        });
      })
      .catch((err) => {});
  }, []);

  async function updateFriendList(friendEmail, friendId) {
    const token = localStorage.getItem("jwtoken");
    axios
      .patch(
        `http://localhost:8080/updateuserfriendlist/${userData.user._id}`,
        {
          friendEmail: `${friendEmail}`,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        axios
          .patch(
            `http://localhost:8080/updateuserfriendlist/${friendId}`,
            {
              friendEmail: `${userData.user.email}`,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((res) => {
            axios
              .patch(
                `http://localhost:8080/updateuserpendingfriendlist/${userData.user._id}/remove`,
                {
                  friendEmail: friendEmail,
                },
                {
                  headers: {
                    Authorization: token,
                  },
                }
              )
              .then((res) => {
                setPendingFriendsList([]);
                axios
                  .get(
                    `http://localhost:8080/getpendingfriends/${userData.user._id}`,
                    {
                      headers: {
                        Authorization: token,
                      },
                    }
                  )
                  .then((resp) => {
                    resp.data.forEach((ele) => {
                      axios
                        .get(`http://localhost:8080/getuserbytext/${ele}`, {
                          headers: {
                            Authorization: token,
                          },
                        })
                        .then((resp) => {
                          setPendingFriendsList([
                            ...pendingFriendsList,
                            resp.data[0],
                          ]);
                        });
                    });
                  })
                  .catch((err) => {});
              });
          });
      });
  }

  return (
    <>
      <div className="flex flex-col glass w-full h-full justify-center items-center py-2">
        <div className="text-center py-2">
          <span
            className="text-[#0E8388] font-bold text-2xl"
            style={{ textShadow: "0 0 4px #0E8388" }}
          >
            Friend Requests
          </span>
        </div>
        {pendingFriendsList ? (
          <>
            {pendingFriendsList.length > 0 ? (
              <>
                <SmallCard
                  users={pendingFriendsList}
                  updateFriendList={updateFriendList}
                />
              </>
            ) : (
              <div className="flex flex-col h-80 transition justify-center gap-3 items-center text-[#0E8388]">
                <i class="fa-solid fa-circle-check text-5xl"></i>
                <span className="text-3xl">All caught up!</span>
              </div>
            )}
          </>
        ) : (
          <Skeleton
            className=""
            height={300}
            highlightColor="rgba(0,0,0,0.5)"
            baseColor="#0E8388"
          />
        )}
      </div>
    </>
  );
}

export default FriendRequests;
