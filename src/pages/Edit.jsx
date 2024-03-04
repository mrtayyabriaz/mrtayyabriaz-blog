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
        .then((post) => {
          setPost(post);
          console.log('container post::', post);
        })
    } else {
      navigate('/')
    }
    console.log('slug', slug);
    console.log('edit post::', post);
  }, [slug])


  return (
    <>
      <PostEditor post={post} />
    </>
  )
}
