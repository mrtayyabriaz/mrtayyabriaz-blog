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
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h5 className='card-title'>{title}</h5>
            <p className='card-text' style={{ "minHeight": 60, 'maxHeight': 60 }}>
              {parse(content.length > 60 ? updatecontent(content) : content)}
            </p>
            <div className="btn btn-success pointer"
              onClick={() => navigate(`/post/${$id}`)}>Read More</div>
          </div>
          <div className="card-footer">
            <div className="text-muted">
              Updated: {$updatedAt.slice(0, 10) + ' ' + $updatedAt.slice(12, 16)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Card