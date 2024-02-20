import { HeaderLinks } from '../../types/interfaces'

export default {
  setAddHeaderLink(state: { headerLinks: HeaderLinks[] }, payload: HeaderLinks) {
    state.headerLinks.unshift(payload)
  },
  setFeatchHeaders(state: { headerLinks: HeaderLinks }, payload: HeaderLinks) {
    state.headerLinks = payload;
  },
  setDeleteHeaderLink(state: { headerLinks: HeaderLinks[] }, id: string) {
    if (!Array.isArray(state.headerLinks)) {
      console.error("state.headerLinks is not an array");
      return;
    }

    state.headerLinks = state.headerLinks.filter((header: HeaderLinks) => {
      return header.id !== id
    })
  },
  setUpdateHeader(state: any, payload: any) {
    // state.headerLinks = payload;
  },
  setHeaderOrder(state: any, payload: any) {
    state.headerLinks = payload;
  },
};
