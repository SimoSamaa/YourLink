import { HeaderLinks } from '@/types/interfacesHeader';
import { link } from '@/types/interfacesLink';

export default {
  // HEADERS
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
  // LINKS
  setUpdateHideLink(state: { links: link[] }, paylaod: any) {
    state.links = state.links.map((link: any) => {
      if (link.id === paylaod.id) {
        return {
          ...link,
          isDisable: paylaod.isDisable
        }
      }
      return link
    })
  },
  setUpdateLayout(state: { links: link[] }, payload: link) {
    state.links = state.links.map((link: link) => {
      if (link.id === payload.id) {
        return {
          ...link,
          layout: payload.layout
        }
      }
      return link
    });
  }
};
