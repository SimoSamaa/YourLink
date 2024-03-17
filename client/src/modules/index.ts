import { createStore } from 'vuex';

import moduleLinks from './links/index';
import moduleAuth from './auth/index';
import moduleUser from './user/index';

const store = createStore({
  modules: {
    links: moduleLinks,
    auth: moduleAuth,
    user: moduleUser,
  }
})

export default store
