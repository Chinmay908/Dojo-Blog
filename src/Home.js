import { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const {
    data: blogs,
    isLoading,
    error,
    count,
  } = useFetch("http://localhost:8000/blogs"); //this will change if it to be used in other components
  const [title,setTitle] = useState("All Blogs!");
  useEffect(()=>{
    if (count==0){
      setTitle("No blogs to display!");
    }
    else{
      setTitle("All Blogs!");
    }
  });

  return (
    <div className="home">
      {error && <h2>{error}</h2>}
      {isLoading && (
        <div>
          <h2>Loading....</h2>
        </div>
      )}
      {blogs && <BlogList blogs={blogs} title={title}/>}
    </div>
  );
};

export default Home;
