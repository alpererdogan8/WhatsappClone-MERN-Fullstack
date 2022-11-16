import React from 'react'
import { ProfilePicture, Search, Options } from '../../icons'
const Header = () => {
  return (
    <div className="main-top">
      <div className="main-top-profile-picture">
        <ProfilePicture />
      </div>
      <div className="main-top-profile-info">
        <div className="title">Lorem Ipsum</div>
        <div className="title-info">kişi bilgisi için buraya tıkla</div>
      </div>
      <div className="main-top-button-group">
        <div className="main-top--search" role={"button"}>
          <Search />
        </div>
        <div className="main-top--settings">
          <Options />
        </div>
      </div>
    </div>
  )
}

export default Header
