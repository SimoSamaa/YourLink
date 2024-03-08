import { HeaderLinks } from '@/types/interfacesHeader';
import { link } from '@/types/interfacesLink';


export default {
  headers(state: { headerLinks: HeaderLinks }) {
    return state.headerLinks;
  },
  links(state: { links: link }) {
    return state.links;
  },
  checkedLinkPage(state: { links: link[] | null, headerLinks: HeaderLinks[] | null }) {
    return state.headerLinks?.length === 0 && state.links?.length === 0;
  }
};
