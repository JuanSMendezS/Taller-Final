import React from 'react'

const Item = (tittle, url) => {
  return (
    <div>
        <img src={url} alt={tittle} />
    </div>
  )
}

export default Item