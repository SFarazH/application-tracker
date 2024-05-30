import React from "react";
import { FaNoteSticky } from "react-icons/fa6";

const Notes = () => {
  return (
    <>
      <div className="bg-indigo-800 p-6 py-5 h-full">
        <div className="flex gap-2 items-center">
          <FaNoteSticky size={35} color="#FFDB58"/>
          <p className="text-[#FFDB58] text-3xl font-semibold">Notes</p>
        </div>
      </div>
    </>
  );
};

export default Notes;
