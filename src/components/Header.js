import React, { PropTypes } from 'react'
import '../styles/header.css'

const Header = ({
  orgs,
  repos,
  isPreview,
  onSaved,
  onChangeMode,
  onDelete,
  onCreate,
  onChangeOrg,
  onChangeRepo,
  onClickLogoff
}) => (
  <div className='header'>
    <select onChange={(e) => onChangeOrg(e.target.value)}>
      {orgs.map((org) => {
        return (
          <option key={org}>{org}</option>
        )
      })}
    </select>
    <select onChange={(e) => onChangeRepo(e.target.value)}>
      {repos.map((repo) => {
        return (
          <option key={repo}>{repo}</option>
        )
      })}
    </select>
    <button onClick={() => onSaved()}>SAVE</button>
    <button
      onClick={() => onChangeMode()}>
      {isPreview ? 'EDIT' : 'PREVIEW'}
    </button>
    <button onClick={() => onDelete()}>DELETE</button>
    <button onClick={() => onCreate()}>CREATE</button>
    <button className='logoff' onClick={() => onClickLogoff()}>LOGOFF</button>
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
