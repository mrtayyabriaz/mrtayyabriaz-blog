import React, { useEffect, useState } from 'react'
import { PostEditor } from '../components/'
import { useNavigate, useParams } from 'react-router-dom'
import service from '../appwrite/config';

export default function Edit() {
  const [post, setPost] = useState({ title: 'loading...', featuredimage: 'loading...', content: 'loading..' })
  const navigate = useNavigate();
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      service.getPost(slug)
        .then((p) => {
          console.log('container post::', p);
          setPost(p)
        })
    } else {
      navigate('/')
    }
  }, [slug])


  return (
    <>
      <PostEditor post={post}/>
    </>
  )
}
