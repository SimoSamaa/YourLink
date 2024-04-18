export default {
  setUser(state: any, payload: any) {
    state.token = payload.token;
    state.userId = payload.userId;
  },
  logout(state: any) {
    // Clear user-related state
    state.token = null;
    state.userId = null;
  }
}
