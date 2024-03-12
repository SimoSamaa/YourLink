import { createStore, Store } from 'vuex';

import moduleLinks from './links/index';
import moduleAuth from './auth/index';

const store = createStore({
  modules: {
    links: moduleLinks,
    auth: moduleAuth
  }
})

export default store
