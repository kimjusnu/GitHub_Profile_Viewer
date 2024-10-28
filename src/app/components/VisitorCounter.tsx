"use client";
import { useEffect, useState, useRef } from "react";
import { MdPeopleOutline, MdOutlineCalendarToday } from "react-icons/md";
import github from "../store/github";

const VisitorCounter = () => {
  const totalVisitors = github(state => state.totalVisitors);
  const todayVisitors = github(state => state.todayVisitors);
  const incrementVisitors = github(state => state.incrementVisitors);

  const [loaded, setLoaded] = useState(false); // To ensure hydration happens correctly
  const isVisited = useRef(false);

  useEffect(() => {
    if (!isVisited.current && typeof window !== "undefined") {
      incrementVisitors();
      isVisited.current = true;
    }
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return (
    <div className="flex space-x-8">
      <div className="flex items-center space-x-2">
        <MdPeopleOutline className="text-[#9D95B9] text-2xl" />
        <div className="text-[#9D95B9]">
          <span className="font-semibold">Total Visitors: </span>
          {totalVisitors.toLocaleString()}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <MdOutlineCalendarToday className="text-[#9D95B9] text-2xl" />
        <div className="text-[#9D95B9]">
          <span className="font-semibold">Today: </span>
          {todayVisitors.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;
