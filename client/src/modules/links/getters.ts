import { HeaderLinks } from '@/types/interfacesHeader';
import { Link } from '@/types/interfacesLink';


export default {
  headers(state: { headerLinks: HeaderLinks }) {
    return state.headerLinks;
  },
  links(state: { links: Link }) {
    return state.links;
  },
  checkedLinkPage(state: { links: Link[] | null, headerLinks: HeaderLinks[] | null }) {
    return state.headerLinks?.length === 0 && state.links?.length === 0;
  }
};
