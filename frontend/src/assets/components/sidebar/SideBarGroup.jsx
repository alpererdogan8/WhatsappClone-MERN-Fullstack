import React from 'react'
import { Header, SearchBar, DirectMsgGroup } from '../sidebar'

const SideBarGroup = () => {
  return (
    <div className="sidebar-container">
      <Header />
      <SearchBar />
      <DirectMsgGroup />
    </div>
  )
}

export default SideBarGroup
