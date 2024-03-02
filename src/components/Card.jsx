import React from 'react'

const Card = ({ post }) => {
  return (
    <>
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h4 className='card-title'>{post.title}</h4>
            <p className='card-text'>  {post.content}</p>
            <div className="btn btn-success">Read More</div>
          </div>
          <div className="card-footer">
            <div className="text-muted">
              Last updated 3 mins ago
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card