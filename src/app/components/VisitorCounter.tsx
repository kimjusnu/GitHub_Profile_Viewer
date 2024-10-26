"use client"; // 클라이언트 전용 컴포넌트
import { useEffect, useRef, useState } from "react";
import github from "../store/github";
import { MdPeopleOutline, MdOutlineCalendarToday } from "react-icons/md";

const VisitorCounter = () => {
  const [loaded, setLoaded] = useState(false); // Hydration 방지용 상태
  const totalVisitors = github(state => state.totalVisitors);
  const todayVisitors = github(state => state.todayVisitors);
  const incrementVisitors = github(state => state.incrementVisitors);

  const isVisited = useRef(false); // 첫 방문 여부 추적

  useEffect(() => {
    if (!isVisited.current) {
      incrementVisitors(); // 방문자 수 증가
      isVisited.current = true;
    }
    setLoaded(true); // 클라이언트 렌더링 완료
  }, [incrementVisitors]);

  // Hydration이 완료될 때까지 렌더링하지 않음
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
