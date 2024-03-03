import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


export const Post = () => {
  const posts = useSelector(state => state.post)
  const post = useParams();
  useEffect(() => {
    console.log(post);
  }, [])
  
  return (
    <>

    </>
  )
}
