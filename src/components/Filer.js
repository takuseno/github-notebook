import React, { PropTypes } from 'react'
import '../styles/filer.css'

const Row = ({ file, onClick }) => (
  <li onClick={() => onClick(file)}>
    {file.path}
  </li>
)

const Filer = ({ files, onClick }) => (
  <div className='sidebar'>
    <ul className='filer'>
      {files.map(file =>
        <Row
          key={file.path + file.sha}
          file={file}
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
