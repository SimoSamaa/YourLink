import userhMutations from './mutations';
import userhActions from './actions';
import userhGetters from './getters';
import { User } from '@/types/interfacesAuth';
import { Link } from '@/types/interfacesLink';
import { HeaderWithId } from '@/types/interfacesHeader';

export default {
  namespaced: true,
  state() {
    return {
      user: {} as User,
      profileInfo: {} as User,
      profileLinks: [] as Link[],
      profileHeaders: [] as HeaderWithId[],
    }
  },
  mutations: userhMutations,
  actions: userhActions,
  getters: userhGetters,
}
