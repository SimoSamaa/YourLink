export default {
  setUser(state: any, payload: any) {
    state.user = payload;
  },
  setUpdateProfil(state: any, payload: any) {
    state.user = { ...payload }
  },
  setRemoveImgUser(state: any) {
    state.user.userImg = ''
  }
}
