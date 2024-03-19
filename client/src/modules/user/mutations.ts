import { User } from '@/types/interfacesAuth';

export default {
  setUser(state: { user: User }, payload: any) {
    state.user = payload;
  },
  setUpdateProfil(state: { user: User }, payload: any) {
    state.user = { ...payload }
  },
  setRemoveImgUser(state: { user: User }) {
    state.user.userImg = ''
  },
  SetFetchUserProfile(state: any, { info, links, headers }: any) {
    state.profileInfo = info;

    state.profileLinks = links;
    state.profileLinks = state.profileLinks
      .filter((link: any) => link.isDisable !== false)
      .sort((a: any, b: any) => a.dataIndex - b.dataIndex);

    state.profileHeaders = headers
    state.profileHeaders = state.profileHeaders
      .filter((header: any) => header.isDisable !== false)
      .sort((a: any, b: any) => a.dataIndex - b.dataIndex);
  }
}
