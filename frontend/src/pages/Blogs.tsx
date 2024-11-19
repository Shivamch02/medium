import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks/index";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"19 Nov 2024"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
