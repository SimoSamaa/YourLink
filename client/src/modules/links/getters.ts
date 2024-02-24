import { HeaderLinks } from '@/types/interfacesHeader';
import { link } from '@/types/interfacesLink';


export default {
  headers(state: { headerLinks: HeaderLinks }) {
    return state.headerLinks;
  },
  links(state: { links: link }) {
    return state.links;
  }
};
