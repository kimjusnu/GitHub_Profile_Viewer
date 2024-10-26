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
    <div className="bg-[#332957] rounded-lg p-6 shadow-md w-[300px] h-[320px]">
      {url ? (
        <Link href={url} passHref>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold text-[#F5EFFB] hover:font-bold"
          >
            {name}
          </a>
        </Link>
      ) : (
        <p className="text-xl font-semibold text-[#F5EFFB]">{name} (No URL)</p>
      )}

      <p className="mb-4 text-[#9D95B9]">
        {description || "This repository has no description available."}
      </p>

      <hr className="border-dotted border-2 text-[#FFFFFF] mb-4" />

      <div className="flex justify-between">
        <div className="flex items-center space-x-1">
          <FaRegStar className="text-[#F5EFFB]" />
          <span>{stars}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaCodeBranch className="text-[#F5EFFB]" />
          <span>{forks}</span>
        </div>
        <div className="flex items-center space-x-1">
          <GoIssueOpened className="text-[#F5EFFB]" />
          <span>{issues}</span>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
