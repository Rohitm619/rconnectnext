"use client";
import React, { useEffect, useState } from "react";

function page() {
  const [value, setMyValue] = useState(null);

  useEffect(() => {
    console.log("rerendered");
    console.log(value);
  });

  return (
    <div className="bg-red-400">
      <button onClick={() => setMyValue(Math.random() * 11)}>Click me</button>
      {value}
    </div>
  );
}

export default page;
