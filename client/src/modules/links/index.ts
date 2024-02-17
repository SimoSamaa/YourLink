import linksGetters from './getters'
import { HeaderLinks } from '../../types/interfaces'

export default {
  namespaced: true,
  state() {
    return {
      headerLinks: [
        {
          id: '1',
          title: 'one'
        },
        {
          id: '2',
          title: 'two'
        },
      ] as HeaderLinks[]
    }
  },
  // mutations: null,
  // actions: null,
  getters: linksGetters,
}
