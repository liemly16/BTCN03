import React from 'react';

export default function Square({ active, x, y, value, handleClick }) {
  return (
    <button type="button" className={active[x][y] ? 'square active' : 'square'}
      onClick={() => handleClick(x, y)}
    >
      {value}
    </button>
  )
}
