import React from 'react'
import { NewMessage, ProfilePicture, Options, StoryNew, } from '../../icons'

const Header = () => {
  return (
    <div className="sidebar-header">
      <div className="sidebar-profile-picture">
        <ProfilePicture />
      </div>
      <div className="sidebar-item-group">
        <div className="sidebar-item--stories">
          <StoryNew />
        </div>
        <div className="sidebar-item--new-message">
          <NewMessage />
        </div>
        <div className="sidebar-item--settings">
          <Options />
        </div>
      </div>
    </div>
  )
}

export default Header
