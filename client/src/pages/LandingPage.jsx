// import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import LandingCarousel from "../components/user/LandingCarousel";

const LandingPage = () => {
  // const [first, setfirst] = useState();
  // useEffect(() => {
  //   console.log("useEffect");
  //   //   const data = await fetch ()
  //   // setfirst(await data.json())
  // }, []);

  return (
    <>
      {console.log("rendring")}
      <LandingCarousel />
    </>
  );
};

export default LandingPage;
