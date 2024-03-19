import userhMutations from './mutations';
import userhActions from './actions';
import userhGetters from './getters';
import { User } from '../../types/interfacesAuth';

export default {
  namespaced: true,
  state() {
    return {
      user: {} as User,
      profileInfo: {} as any,
      profileLinks: [] as any,
      profileHeaders: [] as any,
    }
  },
  mutations: userhMutations,
  actions: userhActions,
  getters: userhGetters,
}
