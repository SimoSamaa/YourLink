import userhMutations from './mutations';
import userhActions from './actions';
import userhGetters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      user: {}
    }
  },
  mutations: userhMutations,
  actions: userhActions,
  getters: userhGetters,
}
