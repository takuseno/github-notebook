import { combineReducers } from 'redux'
import dialogs from './dialogs'
import repository from './repository'
import files from './files'
import currentFile from './currentFile'
import currentContent from './currentContent'
import uiStatus from './uiStatus'

export default combineReducers({
  repository,
  files,
  currentFile,
  currentContent,
  uiStatus,
  dialogs
})
