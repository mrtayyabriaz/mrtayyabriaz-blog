import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import parse from "html-react-parser";
import { useNavigate, useParams } from 'react-router-dom'
import services from '../appwrite/config'
import {Button} from '../components';

export const Post = () => {
  const [post, setpost] = useState({ title: 'loading...', featuredimage: 'loading...', content: 'loading' });
  const [theFile, settheFile] = useState({ href: '.' });

  const navigate = useNavigate();
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    services.getPost(slug).then((post) => {
      post ? setpost(post) : navigate('/')
    })
  }, [slug])

  useEffect(() => {
    const file = services.getFile(slug);
    settheFile(file);
  }, [])


  return (
    <>
      <div className="mx-2 mt-2">
        <div className="flex w-full items-end justify-end">
          <Button
            className=" border-green-700 border-2 text-green-700"
            onClick={() => navigate(`/edit/${post.$id}`)}>Edit</Button>
        </div>
        <h2 className='font-bold h-10 text-black mb-2 text-2xl'>{post.title}</h2>
        <div className='max-w-screen-sm'><img src={theFile.href} className='w-100' alt={post.title} /></div>
        <div className='my-4'>{parse(post.content)}</div>
      </div>
    </>
  )
}
