import React, { PropTypes } from 'react'
import '../styles/filer.css'

const Row = ({ file, active, onClick }) => (
  <li className={active ? 'active' : ''} onClick={() => onClick(file)}>
    {file.path}
  </li>
)

const Filer = ({ files, currentFile, onClick }) => (
  <div className='sidebar'>
    <ul className='filer'>
      {files.map(file =>
        <Row
          key={file.path + file.sha}
          file={file}
          active={currentFile !== null && file.path === currentFile.path}
          onClick={onClick}>
        </Row>
      )}
    </ul>
  </div>
)

Filer.propTypes = {
  files: PropTypes.array.isRequired
}

export default Filer
