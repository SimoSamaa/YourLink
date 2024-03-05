import linksMutations from './mutations';
import linksActions from './actions';
import linksGetters from './getters';

import { HeaderLinks } from '@/types/interfacesHeader';
import { link } from '@/types/interfacesLink';

export default {
  namespaced: true,
  state() {
    return {
      headerLinks: [] as HeaderLinks[],
      links: [
        // {
        //   id: '1',
        //   title: 'githup',
        //   link: 'https://github.com/SimoSamaa',
        //   dataIndex: 0,
        //   isDisable: true,
        //   layout: 'classic',
        //   icon: 'typescript',
        // },
        // {
        //   id: '2',
        //   title: 'codepen',
        //   link: 'https://code.com/simo',
        //   dataIndex: 1,
        //   isDisable: true,
        //   layout: 'classic',
        //   icon: 'nodejs',
        // }
      ] as link[]
    }
  },
  mutations: linksMutations,
  actions: linksActions,
  getters: linksGetters,
}
