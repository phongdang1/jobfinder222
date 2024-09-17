import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { Link } from "react-router-dom";

function Paginition({ back, next }) {
  return (
    <div className="h-16 lg:mx-40 md:mx-10 my-10 bg-white shadow-xl rounded-2xl flex justify-between items-center">
      <Link
        className="flex gap-2 pl-4 
       hover:bg-primary cursor-pointer rounded-2xl items-center h-full transition-all duration-300 pr-4"
        to={back}
      >
        <div className="flex gap-1">
          <ArrowBackIcon />
          <p>Back</p>
        </div>
      </Link>
      <div>Page</div>
      <Link
        className="flex gap-2 pl-4 
       hover:bg-primary cursor-pointer rounded-2xl items-center h-full transition-all duration-300 pr-4"
        to={next}
      >
        <div className="flex gap-1">
          <p>Next</p>
          <ArrowForwardIcon />
        </div>
      </Link>
    </div>
  );
}

export default Paginition;
