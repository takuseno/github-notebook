import React, { PropTypes } from 'react'
import CodeMirror from 'react-codemirror'
require('codemirror/lib/codemirror.css')
require('codemirror/mode/markdown/markdown')

const Editor = ({ content, onUpdated, onSaved }) => (
  <div
    className='editor'>
      <CodeMirror
        value={content}
        onChange={onUpdated}
        options={{mode: 'markdown', lineNumbers: true}}>
      </CodeMirror>
      <button onClick={() => onSaved(content)}>Save</button>
  </div>
)

Editor.propTypes = {
  content: PropTypes.string.isRequired,
  onUpdated: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
}

export default Editor
