import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import parse from "html-react-parser";
import { useNavigate, useParams } from 'react-router-dom'
import services from '../appwrite/config'

export const Post = () => {
  const [post, setpost] = useState({ title: 'loading...', featuredimage: 'loading...', content: 'loading' });
  const [theFile, settheFile] = useState({ href: '.' });

  // const posts = useSelector(state => state.posts)
  const navigate = useNavigate();
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    services.getPost(slug).then((post) => {
      post ? setpost(post) : navigate('/')
    })
  }, [slug])

  useEffect(() => {
    // console.log(post.featuredimage);
    const file = services.getFile(slug);
    // console.log('file', file);
    settheFile(file);
    // console.log('theFile',theFile);

    // console.log('file::getting', file);
  }, [])


  return (
    <>
      <div className="container mt-2">
        <div className="w-100 d-flex align-center justify-content-end">
          <button
            className="btn btn-success"
            onClick={() => navigate(`/edit/${post.$id}`)}>Edit</button>
        </div>
        <h2 className='text-green-600 font-bold font-large h-10'>{post.title}</h2>
        <div><img src={theFile.href} className='w-100' alt={post.title} />
        </div>
        <div>{parse(post.content)}</div>
      </div>
    </>
  )
}
