import { combineReducers } from 'redux'
import dialogs from './dialogs'
import orgs from './organizations'
import repository from './repository'
import repos from './repositories'
import files from './files'
import currentFile from './currentFile'
import currentContent from './currentContent'
import uiStatus from './uiStatus'

export default combineReducers({
  repository,
  repos,
  orgs,
  files,
  currentFile,
  currentContent,
  uiStatus,
  dialogs
})
