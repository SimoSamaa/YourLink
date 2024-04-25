export default {
  async selectedTheme(context: any, payload: any) {
    context.commit('setSelectedTheme', payload)
  }
}
