import userhMutations from './mutations';
import userhActions from './actions';
import userhGetters from './getters';
import { User } from '@/types/interfacesAuth';
import { Link } from '@/types/interfacesLink';
import { HeaderWithId } from '@/types/interfacesHeader';
import { Theme } from '@/types/interfacesTheme';

export default {
  namespaced: true,
  state() {
    return {
      user: {} as User,
      profileInfo: {} as User,
      theme: {} as Theme | null,
      profileLinks: [] as Link[],
      profileHeaders: [] as HeaderWithId[],
    }
  },
  mutations: userhMutations,
  actions: userhActions,
  getters: userhGetters,
}
