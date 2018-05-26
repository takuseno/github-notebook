import React, { PropTypes } from 'react'
import MarkdownPreview from './MarkdownPreview'
import SimpleMDE from 'react-simplemde-editor'
import * as actions from '../actions'
import '../styles/editor.css'
import "simplemde/dist/simplemde.min.css"

const Editor = ({ content, isPreview, onUpdated, changeMode }) => (
  <div
    className='editor'>
      <div className='view'>
        {isPreview
          ? <MarkdownPreview
            changeMode={changeMode}
            code={content}>
          </MarkdownPreview>
          : <div>
            <SimpleMDE
              value={content}
              onChange={onUpdated}
              extraKeys={{
                "Ctrl-C": (cm) => changeMode()
              }}
              options={{toolbar: false, status: false}}/>
            </div>
        }
      </div>
  </div>
)

Editor.propTypes = {
  content: PropTypes.string.isRequired,
  isPreview: PropTypes.bool.isRequired,
  onUpdated: PropTypes.func.isRequired
}

export default Editor
