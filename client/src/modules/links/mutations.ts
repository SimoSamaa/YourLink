import { HeaderLinks } from '@/types/interfacesHeader'

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
};
