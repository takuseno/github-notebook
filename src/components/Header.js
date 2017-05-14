import React, { PropTypes } from 'react'
import '../styles/header.css'

const Header = ({ isPreview, onSaved, onChangeMode, onDelete, onCreate }) => (
  <div className='header'>
    <select
    <button onClick={() => onSaved()}>Save</button>
    <button
      onClick={() => onChangeMode()}>
      {isPreview ? 'Edit' : 'Preview'}
    </button>
    <button onClick={() => onDelete()}>Delete</button>
    <button onClick={() => onCreate()}>Create</button>
  </div>
)

Header.propTypes = {
  isPreview: PropTypes.bool.isRequired,
  onSaved: PropTypes.func.isRequired,
  onChangeMode: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
}

export default Header
