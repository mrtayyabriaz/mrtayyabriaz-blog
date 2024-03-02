import React from 'react'

const Card = ({ title,content,$updatedAt }) => {
  return (
    <>
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h4 className='card-title'>{title}</h4>
            <p className='card-text'>  {content}</p>
            <div className="btn btn-success">Read More</div>
          </div>
          <div className="card-footer">
            <div className="text-muted">
              
              Updated: {$updatedAt.slice(0, 10)+' '+$updatedAt.slice(12,16)}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card