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

      <h1 className="font-bold mt-3 ml-3 text-2xl">Posts</h1>
      <div className="mb-6 w-full grid place-items-center sm:grid-cols-2 lg:grid-cols-3">

        {posts ? posts.map((post) => {
          return (
            <div className="border rounded-md m-2 my-4 transition w-[300px] hover:shadow-lg hover:shadow-gray-400 hover:scale-105" key={post.$id}>
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
