import React from 'react'

function Spinner() {
  return (
    <div className="spinner-border text-info text-center" role="status" style={{height:'100px', width:'100px'}}>
    <span className="visually-hidden sr-only">Loading...</span>
    </div>
  )
}

export default Spinner