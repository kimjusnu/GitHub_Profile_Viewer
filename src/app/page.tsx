"use client";
import { IoLogoGithub } from "react-icons/io";
import SearchBar from "./components/SearchBar";
import VisitorCounter from "./components/VisitorCounter";
const page = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-between px-4 py-10">
      <div className="flex flex-col space-y-20">
        <div className="flex flex-col space-y-10 mt-14">
          <div className="mt-8 text-2xl text-[#F5EFFB] flex items-center justify-center">
            <IoLogoGithub className="text-[#F5EFFB] mr-3" /> GitHub Profile
            Viewer
          </div>
          <div
            style={{ lineHeight: "1.2" }}
            className=" text-[#F5EFFB] tracking-wider text-center text-6xl font-bold flex justify-center items-center"
          >
            Search for a GitHub user
            <br />
            and browse their repositories
            <br />
            easily.
          </div>
        </div>
        {/* 구분선 */}
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex justify-center items-center">
            <SearchBar />
          </div>
          <div className="text-[#807C8F] flex justify-center items-center text-center">
            Note: Limited to 60 requests per hour for unauthenticated users.
          </div>
        </div>
        <div className="text-[#9D95B9] flex justify-center text-center items-center mt-10">
          <VisitorCounter />
        </div>
      </div>
    </div>
  );
};
export default page;
