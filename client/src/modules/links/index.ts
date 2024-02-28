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
        {
          id: '1',
          title: 'githup',
          link: 'https://github.com/SimoSamaa',
          dataIndex: 0,
          isDisable: true,
          layout: 'classic',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>',
        },
        {
          id: '2',
          title: 'codepen',
          link: 'https://code.com/simo',
          dataIndex: 0,
          isDisable: true,
          layout: 'classic',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 15l9 6l9 -6l-9 -6l-9 6" /><path d="M3 9l9 6l9 -6l-9 -6l-9 6" /><path d="M3 9l0 6" /><path d="M21 9l0 6" /><path d="M12 3l0 6" /><path d="M12 15l0 6" /></svg>',
        }
      ] as link[]
    }
  },
  mutations: linksMutations,
  actions: linksActions,
  getters: linksGetters,
}
