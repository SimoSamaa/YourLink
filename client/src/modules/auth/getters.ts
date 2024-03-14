export default {
  userId(state: { userId: string | null }) {
    return state.userId
  },
  token(state: { token: string | null }) {
    return state.token
  },
  isAuth(state: { token: string | null }) {
    return !!state.token
  }
}
