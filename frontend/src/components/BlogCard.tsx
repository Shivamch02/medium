import { Link } from "react-router-dom";
import { useState } from "react";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <Avatar name={authorName} />
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col px-2 ">
            <Circle />
          </div>
          <div className="font-thin text-slate-500 text-sm flex justify-center flex-col">
            {" "}
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 170) + "..."}</div>
        <div className="text-slate-500 text-sm font-thin pt-4">{`${Math.floor(
          content.length / 200
        )} min read`}</div>
      </div>
    </Link>
  );
};

export const Circle = () => {
  return <div className="w-1 h-1 rounded-full bg-slate-500"></div>;
};

export const Avatar = ({
  name,
  email,
  size = "small",
}: {
  name: string;
  email?: string;
  size?: "small" | "big";
}) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-all duration-200 shadow-md border border-gray-200 ${
        size === "small" ? "w-8 h-8" : "w-12 h-12"
      } overflow-hidden bg-gradient-to-tr from-gray-900 via-gray-700 to-gray-500 rounded-full cursor-pointer group`}
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <span
        className={`$${
          size === "small" ? "text-sm" : "text-lg"
        } font-semibold text-white`}
      >
        {name[0]}
      </span>
      {showPopup && (
        <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-3 min-w-[220px] bg-white rounded-xl shadow-xl border border-gray-200 p-4 flex flex-col items-center animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-900 via-gray-700 to-gray-500 flex items-center justify-center mb-2">
            <span className="text-lg font-semibold text-white">{name[0]}</span>
          </div>
          <div className="text-base font-bold text-gray-900">{name}</div>
          {email && <div className="text-sm text-gray-500 mt-1">{email}</div>}
        </div>
      )}
    </div>
  );
};

export default BlogCard;
