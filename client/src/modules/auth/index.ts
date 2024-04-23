import authMutations from './mutations';
import authActions from './actions';
import authGetters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      token: null as string | null,
      userId: null as string | null,
      didAutoLogout: false as boolean,
    }
  },
  mutations: authMutations,
  actions: authActions,
  getters: authGetters,
}
