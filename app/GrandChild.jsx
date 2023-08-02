"use client";
import React from "react";
import { useContext } from "react";
import tokenContext from "../contexts/userContext";
import GreatGrandChild from "./GreatGrandChild";

function GrandChild() {
  const tokenObj = useContext(tokenContext);

  return (
    <div>
      <h1>GrandChild {`${tokenObj.token}`}</h1>
      <GreatGrandChild />
    </div>
  );
}

export default GrandChild;
