import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import Card from "../components/Card";

const AllPosts = () => {
  const [posts, setposts] = useState([]);

  useEffect(() => {
    service.getPosts().then((p) => {
      if (p) {
        setposts(p.documents);
      }
      console.log(p.documents[0]);
    });
  }, []);

  return (
    <>
      <h1>All Posts</h1>
      <div className="row row-cols-1 row-cols-sm-3 g-4 mx-2">

      {posts ? posts.map((post) => {
        return (
          <div key={post.$id}>
                <Card post={post} />
              </div>
            );
          })
          : null}
          </div>
    </>
  );
};

export default AllPosts;
