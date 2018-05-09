import React, { PropTypes } from 'react'
import '../styles/header.css'

const Header = ({ orgs, repos, isPreview, onSaved, onChangeMode, onDelete, onCreate, onChangeOrg, onChangeRepo }) => (
  <div className='header'>
    <select onChange={(e) => onChangeOrg(e.target.value)}>
      {orgs.map((org) => {
        return (
          <option>{org}</option>
        )
      })}
    </select>
    <select onChange={(e) => onChangeRepo(e.target.value)}>
      {repos.map((repo) => {
        return (
          <option>{repo}</option>
        )
      })}
    </select>
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
