import { combineReducers } from 'redux'
import dialogs from './dialogs'
import contents from './contents'
import uiStatus from './uiStatus'
import userInfo from './userInfo'

export default combineReducers({
  contents,
  uiStatus,
  dialogs,
  userInfo
})
