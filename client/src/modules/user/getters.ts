import { User } from '@/types/interfacesAuth';
import { Link } from '@/types/interfacesLink';
import { HeaderWithId } from '@/types/interfacesHeader';

export default {
  user(state: { user: User }) {
    return state.user
  },
  profileInfo(state: { profileInfo: User }) {
    return state.profileInfo
  },
  profileLinks(state: { profileLinks: Link[] }) {
    return state.profileLinks
  },
  profileHeaders(state: { profileHeaders: HeaderWithId[] }) {
    return state.profileHeaders
  },
}
