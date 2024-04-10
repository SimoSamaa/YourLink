import linksMutations from './mutations';
import linksActions from './actions';
import linksGetters from './getters';

import { HeaderLinks } from '@/types/interfacesHeader';
import { Link } from '@/types/interfacesLink';

export default {
  namespaced: true,
  state() {
    return {
      headerLinks: [] as HeaderLinks[],
      links: [] as Link[],
      uploadProgress: {
        id: '',
        progress: 0
      } as {
        id: string,
        progress: number
      },
    }
  },
  mutations: linksMutations,
  actions: linksActions,
  getters: linksGetters,
}
