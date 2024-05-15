import { HeaderLinks } from '@/types/interfacesHeader';
import { Link } from '@/types/interfacesLink';

function updateLinkProperty(state: { links: Link[] }, payload: { id: string; property: string; value: any }) {
  state.links = state.links.map((link) => {
    if (link.id === payload.id) {
      return {
        ...link,
        [ payload.property ]: payload.value
      };
    }
    return link;
  });
}

export default {
  // HEADERS
  setAddHeaderLink(state: { headerLinks: HeaderLinks[] }, payload: HeaderLinks) {
    state.headerLinks.unshift(payload)
  },
  setFeatchHeaders(state: { headerLinks: HeaderLinks }, payload: HeaderLinks) {
    state.headerLinks = payload;
  },
  // DELETE HEADER
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
  // ADD LINK
  setAddLink(state: { links: Link[] }, payload: any) {
    state.links.unshift(payload);
  },
  setFetchLinks(state: { links: Link[] }, payload: any) {
    state.links = payload;
  },
  setUpdateLinkTitle(state: { links: Link[] }, payload: { id: string; title: string }) {
    updateLinkProperty(state, { id: payload.id, property: 'title', value: payload.title });
  },
  setUpdateLink(state: { links: Link[] }, payload: { id: string; link: string }) {
    updateLinkProperty(state, { id: payload.id, property: 'link', value: payload.link });
  },
  setUpdateHideLink(state: { links: Link[] }, payload: { id: string; isDisable: boolean }) {
    updateLinkProperty(state, { id: payload.id, property: 'isDisable', value: payload.isDisable });
  },
  setUpdateLayout(state: { links: Link[] }, payload: Link) {
    updateLinkProperty(state, { id: String(payload.id), property: 'layout', value: payload.layout });
  },
  setUpdateChooseBoxicon(state: { links: Link[] }, payload: { id: string; icon: string }) {
    updateLinkProperty(state, { id: payload.id, property: 'icon', value: payload.icon });
  },
  // DELETE LINK
  setDeleteLink(state: { links: Link[] }, payload: string) {
    state.links = state.links.filter((link) => link.id !== payload)
  },
  setUploadLinkImg(state: any, payload: any) {
    updateLinkProperty(state, { id: payload.id, property: 'icon', value: payload.icon });
  },
  setDeleteUploadedImg(state: { links: Link[] }, payload: string) {
    updateLinkProperty(state, { id: payload, property: 'icon', value: '' });
  }
};
