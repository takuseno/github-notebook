import { combineReducers } from 'redux'
import dialogs from './dialogs'
import orgs from './organizations'
import repository from './repository'
import repos from './repositories'
import files from './files'
import currentFile from './currentFile'
import currentContent from './currentContent'
import uiStatus from './uiStatus'
import userInfo from './userInfo'
import organization from './organization'

export default combineReducers({
  repository,
  repos,
  orgs,
  files,
  currentFile,
  currentContent,
  uiStatus,
  dialogs,
  userInfo,
  organization
})
