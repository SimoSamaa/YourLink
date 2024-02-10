import { createStore, Store } from 'vuex';

import moduleLinks from './links/index';

const store = createStore({
  modules: {
    links: moduleLinks
  }
})

export default store
