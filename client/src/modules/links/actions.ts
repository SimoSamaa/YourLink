import { HeaderLinks } from '../../types/interfaces'
import { ActionContext } from 'vuex';

export default {
  addHeaderLink({ commit }: ActionContext<HeaderLinks, any>, paylaod: HeaderLinks) {

    // const data = {
    //   id: "1",
    //   title: "",
    //   isDisable: false,
    // }

    commit('setAddHeaderLink', paylaod)
  },
  deleteHeaderLink({ commit }: ActionContext<HeaderLinks, any>, id: string) {
    //
    commit('setDeleteHeaderLink', id);
  },
};
