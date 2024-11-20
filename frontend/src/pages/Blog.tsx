import AppBar from "../components/AppBar";
import FullBlog from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks/index";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  console.log(id);
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};

export default Blog;
