import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

const AppBar = () => {
  const navigate = useNavigate();
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        className="flex flex-col justify-center cursor-pointer text-2xl font-bold"
        to={"/blogs"}
      >
        Medium
      </Link>
      <div className="flex items-center">
        <Link to={"/publish"}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2"
          >
            New
          </button>
        </Link>
        <div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
            className="mr-4 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center cursor-pointer"
          >
            Logout
          </button>
        </div>

        <Avatar name={"Shivam Chaurasiya"} size={"big"} />
      </div>
    </div>
  );
};

export default AppBar;
