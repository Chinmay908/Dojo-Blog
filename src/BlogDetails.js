import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
const BlogDetails = () => {
  const { id } = useParams(); /* grabs whatever is in route - the dynamic part*/
  const {
    data: blog,
    isLoading,
    error,
  } = useFetch("http://localhost:8000/blogs/" + id);
  const history = useHistory();
  const handleDelete = () => {
    fetch("http://localhost:8000/blogs/" + id, { /*Deleting the specific blog as per the url with the particular id*/
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };
  return (
    <div className="blog-details">
      {isLoading && <h2>Loading...</h2>}
      {error && { error }}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written By: {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
