import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Card } from "../components";
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

      <h1 className="">Posts</h1>
      <div className="pl-5 w-full grid grid-cols-3">

        {posts ? posts.map((post) => {
          return (
            <div className="m-2 w-[300px] rounded-md border" key={post.$id}>
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
