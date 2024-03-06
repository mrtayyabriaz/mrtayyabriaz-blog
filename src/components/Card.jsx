import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'
import service from '../appwrite/config'
import Button from './Button'

const Card = ({ title, content, $updatedAt, $id }) => {
  const navigate = useNavigate();

  function updatecontent(content) {
    // console.log(content);
    return content = content.slice(0, 30) + '...';
  }

  return (
    <>
      <img
        src={service.getFile($id).href}
        alt="Laptop"
        className="h-[200px] w-full rounded-t-md object-cover"
      />
      <div>
        <div className="p-4">

          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="mt-3 text-sm text-gray-600">
            {parse(content.length > 60 ? updatecontent(content) : content)}
          </p>
          <Button
            type="button"
            className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => navigate(`/post/${$id}`)}
          >
            Read More
          </Button>
        </div>
        <div className="bg-gray-200 rounded-b-md px-2">
          Updated: {$updatedAt.slice(0, 10) + ' ' + $updatedAt.slice(12, 16)}
        </div>
      </div>
    </>
  )
}
export default Card