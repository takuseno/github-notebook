import * as Immutable from 'immutable'

export default (state = Immutable.OrderedMap({
  userName: localStorage.getItem('userName'),
  token: localStorage.getItem('token')
}), action) => {
  switch (action.type) {
    case 'AUTHENTICATED':
      localStorage.setItem('token', action.token)
      localStorage.setItem('userName', action.userName)
      state = state.set('token', action.token)
      return state.set('userName', action.userName)

    default:
      return state
  }
}
