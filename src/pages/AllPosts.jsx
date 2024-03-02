import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import {Card} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { saveposts } from "../store/authslice";

const AllPosts = () => {
  const [posts, setposts] = useState([]);
  const dispatch = useDispatch();
  const storedposts = useSelector((state) => state.posts);
  const postssaved = useSelector((state) => state.postssaved);

  useEffect(() => {
    if (postssaved) {
      setposts(storedposts)
      console.log(storedposts, 'store')
    } else {

      service.getPosts().then((p) => {
        if (p) {
          setposts(p.documents);
          dispatch(saveposts(p.documents));
        }
        console.log(p.documents, 'api');
      });
    }
  }, []);

  return (
    <>
      <h1>All Posts</h1>
      <div className="row row-cols-1 row-cols-sm-3 g-4 mx-2">

        {posts ? posts.map((post) => {
          return (
            <div key={post.$id}>
              <Card {...post} />
            </div>
          );
        })
          : null}
      </div>
    </>
  );
};

export default AllPosts;
