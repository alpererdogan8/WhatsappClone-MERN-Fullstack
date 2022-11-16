import React from 'react'
import { Attach, Emoji, Microphone } from '../../icons'
import TextArea from "react-textarea-autosize"

const Bottom = () => {


  return (
    <div className="main-bottom">
      <div className="main-bottom-button-group">
        <div className="main-bottom-button-group--emoji">
          <button>
            <Emoji />
          </button>
        </div>
        <div className="main-bottom-button-group--attach">
          <button>
            <Attach />
          </button>
        </div>
      </div>
      <div className="main-bottom-textbox">
        <TextArea placeholder="Bir mesaj yazın" />
      </div>
      <div className="main-bottom--mic">
        <button>
          <Microphone />
        </button>
      </div>
    </div>
  )
}

export default Bottom
