import linksMutations from './mutations';
import linksActions from './actions';
import linksGetters from './getters';

import { HeaderLinks } from '../../types/interfaces';

export default {
  namespaced: true,
  state() {
    return {
      headerLinks: [
        // {
        //   id: '1',
        //   title: 'one',
        //   isDisable: true,
        //   dataIndex: 0
        // },
        // {
        //   id: '2',
        //   title: 'two',
        //   isDisable: true,
        //   dataIndex: 1
        // },
      ] as HeaderLinks[]
    }
  },
  mutations: linksMutations,
  actions: linksActions,
  getters: linksGetters,
}
