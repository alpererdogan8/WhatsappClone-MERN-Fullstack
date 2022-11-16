import React from 'react'
import DirectMessage from './sub_components/DirectMessage'

const DirectMsgItem = () => {
  const a = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]

  return (
    <div className="sidebar-item-msg-group">
      {a.map((i, key) => (
        <DirectMessage d={i} key={key} />
      ))}
    </div>
  )
}

export default DirectMsgItem
