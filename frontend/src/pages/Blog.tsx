import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks/index";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  console.log(id);
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <FullBlog />
    </div>
  );
};

export default Blog;
