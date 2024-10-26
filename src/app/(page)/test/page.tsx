"use client";
import SearchBar from "@/app/components/SearchBar";
import VisitorCounter from "@/app/components/VisitorCounter";
import RepositoiryCard from "@/app/components/RepositoiryCard";
const page = () => {
  return (
    <div>
      <SearchBar />
      <VisitorCounter />
      <RepositoiryCard />
    </div>
  );
};
export default page;
