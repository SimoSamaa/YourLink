import { User } from '@/types/interfacesAuth';
export default {
  user(state: { user: User }) {
    return state.user
  },
  profileInfo(state: any,) {
    return state.profileInfo
  },
  profileLinks(state: any,) {
    return state.profileLinks
  },
  profileHeaders(state: any) {
    return state.profileHeaders
  },
}
