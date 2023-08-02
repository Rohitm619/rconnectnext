"use client";
import React from "react";
import { useContext } from "react";
import tokenContext from "../../contexts/tokenContext";

function GreatGrandChild() {
  const tokenObj = useContext(tokenContext);

  const changeStateOfToken = () => {
    tokenObj.setToken(!tokenObj.token);
  };

  return (
    <div>
      GreatGrandChild
      {`${tokenObj.token}`}
      <button onClick={changeStateOfToken}>Change Token</button>
    </div>
  );
}

export default GreatGrandChild;
