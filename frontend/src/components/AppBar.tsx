import { Avatar } from "./BlogCard";

const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className="flex flex-col justify-center">Medium</div>
      <div>
        <Avatar name={"Shivam Chaurasiya"} size={"big"} />
      </div>
    </div>
  );
};

export default AppBar;
