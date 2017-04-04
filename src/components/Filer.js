import React, { PropTypes } from 'react'

const Row = ({ file, onClick }) => (
  <li onClick={() => onClick(file)}>
    {file.path}
  </li>
)

const Filer = ({ files, onClick }) => (
  <ul className='filer'>
    {files.map(file =>
      <Row
        key={file.sha}
        file={file}
        onClick={onClick}>
      </Row>
    )}
  </ul>
)

Filer.propTypes = {
  files: PropTypes.array.isRequired
}

export default Filer
