import { useEffect, useRef } from "react";
import github from "../store/github";
import { MdPeopleOutline, MdOutlineCalendarToday } from "react-icons/md";

const VisitorCounter = () => {
  // 개별 셀렉터로 분리하여 불필요한 리렌더링 방지
  const totalVisitors = github(state => state.totalVisitors);
  const todayVisitors = github(state => state.todayVisitors);
  const incrementVisitors = github(state => state.incrementVisitors);

  const isVisited = useRef(false);

  useEffect(() => {
    // 컴포넌트 마운트 시에만 실행
    if (!isVisited.current) {
      incrementVisitors();
      isVisited.current = true;
    }
  }, []); // 빈 의존성 배열로 마운트 시에만 실행되도록 수정

  return (
    <div className="flex space-x-8">
      <div className="flex items-center space-x-2">
        <span className="text-[#9D95B9]">
          <MdPeopleOutline />
        </span>
        <div className="text-[#9D95B9]">
          <span className="font-semibold">Total Visitors: </span>
          {totalVisitors.toLocaleString()}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-[#9D95B9]">
          <MdOutlineCalendarToday />
        </span>
        <div className="text-[#9D95B9]">
          <span className="font-semibold">Today: </span>
          {todayVisitors.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;
