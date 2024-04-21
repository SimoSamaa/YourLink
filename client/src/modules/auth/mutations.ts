type userType = { token: string, userId: string, didAutoLogout: boolean };

export default {
  setUser(state: userType, payload: { token: string, userId: string }) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
  },
  setAutoLogout(state: userType) {
    state.didAutoLogout = true;
  }
}
