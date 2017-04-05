import React, { PropTypes } from 'react'
import CodeMirror from 'react-codemirror'
import MarkdownPreview from './MarkdownPreview'
import '../styles/editor.css'
require('codemirror/lib/codemirror.css')
require('codemirror/mode/markdown/markdown')

const Editor = ({ content, isPreview, onUpdated, onSaved, onChangeMode }) => (
  <div
    className='editor'>
      <div className='buttons'>
        <button onClick={() => onSaved(content)}>Save</button>
        <button
          onClick={() => onChangeMode()}>
          {isPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
      <div className='view'>
        {isPreview
          ? <MarkdownPreview
            code={content}>
          </MarkdownPreview>
          : <CodeMirror
            value={content}
            onChange={onUpdated}
            options={{mode: 'markdown', lineNumbers: true}}>
          </CodeMirror>
        }
      </div>
  </div>
)

Editor.propTypes = {
  content: PropTypes.string.isRequired,
  isPreview: PropTypes.bool.isRequired,
  onUpdated: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
  onChangeMode: PropTypes.func.isRequired
}

export default Editor
