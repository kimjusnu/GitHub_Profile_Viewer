import { FaCodeBranch, FaRegStar } from "react-icons/fa";
import { GoIssueOpened } from "react-icons/go";
import Link from "next/link";

interface RepositoryCardProps {
  name: string;
  description: string;
  stars: number;
  forks: number;
  issues: number;
  url: string | undefined; // url이 undefined일 수 있음을 명시
}

const RepositoryCard = ({
  name,
  description,
  stars,
  forks,
  issues,
  url,
}: RepositoryCardProps) => {
  return (
    <div className="bg-[#332957] rounded-lg p-6 shadow-md w-[350px] h-[370px]">
      {url ? (
        <Link href={url} legacyBehavior passHref>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl font-semibold text-[#F5EFFB] hover:font-bold hover:underline"
          >
            {name}
          </a>
        </Link>
      ) : (
        <p className="text-2xl font-semibold text-[#F5EFFB]">{name} (No URL)</p>
      )}

      <p className="mb-4 text-xl text-[#9D95B9]">
        {description || "This repository has no description available."}
      </p>
      <br />
      <hr className="border-dotted border-2 text-[#FFFFFF]" />
      <br />
      <div className="flex justify-between">
        <div className="flex flex-col items-center space-x-1">
          <FaRegStar className="text-[#F5EFFB] text-2xl" />
          <span className="text-[#F5EFFB] flex">
            {stars} <p className="text-[#9D95B9] ml-1"> Stars</p>
          </span>
        </div>
        <div className="flex flex-col items-center space-x-1">
          <FaCodeBranch className="text-[#F5EFFB] text-2xl" />
          <span className="text-[#F5EFFB] flex">
            {forks} <p className="text-[#9D95B9] ml-1"> Forks</p>
          </span>
        </div>
        <div className="flex flex-col items-center space-x-1">
          <GoIssueOpened className="text-[#F5EFFB] text-2xl" />
          <span className="text-[#F5EFFB] flex">
            {issues} <p className="text-[#9D95B9] ml-1"> Issues</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
