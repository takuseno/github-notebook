import React, { PropTypes } from 'react'
import '../styles/header.css'

const Header = ({ isPreview, onSaved, onChangeMode }) => (
  <div className='header'>
    <button onClick={() => onSaved()}>Save</button>
    <button
      onClick={() => onChangeMode()}>
      {isPreview ? 'Edit' : 'Preview'}
    </button>
  </div>
)

Header.propTypes = {
  isPreview: PropTypes.bool.isRequired,
  onSaved: PropTypes.func.isRequired,
  onChangeMode: PropTypes.func.isRequired
}

export default Header
