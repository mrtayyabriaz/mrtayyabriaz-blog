import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'

const Card = ({ title, content, $updatedAt, $id }) => {
  const navigate = useNavigate();

  function updatecontent(content) {
    console.log(content);
    return content = content.slice(0, 30) + '...';
  }

  return (
    <>
      {/* Updated: {$updatedAt.slice(0, 10) + ' ' + $updatedAt.slice(12, 16)} */}

        <img
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
          alt="Laptop"
          className="h-[200px] w-full rounded-md object-cover"
        />
        <div className="p-4">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="mt-3 text-sm text-gray-600">
            {parse(content.length > 60 ? updatecontent(content) : content)}
          </p>
          <button
            type="button"
            className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => navigate(`/post/${$id}`)}
          >
            Read More
          </button>
        </div>
    </>
  )
}
export default Card