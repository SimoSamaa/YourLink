export default {
  setUser(state: any, payload: any) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.tokenExp = payload.tokenExp;
  }
}
