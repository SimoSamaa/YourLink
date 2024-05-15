import { User } from '@/types/interfacesAuth';
import { Theme } from '@/types/interfacesTheme';
import { Link } from '@/types/interfacesLink';
import { HeaderWithId } from '@/types/interfacesHeader';

type ProfileData = {
  profileInfo: User,
  theme: Theme,
  profileHeaders: HeaderWithId[],
  profileLinks: Link[]
};

type PayloadData = {
  info: User,
  theme: Theme,
  headers: HeaderWithId[],
  links: Link[]
};

export default {
  setUser(state: { user: User }, payload: User) {
    state.user = payload;
  },
  setUpdateProfil(state: { user: User }, payload: User) {
    state.user = { ...payload }
  },
  setRemoveImgUser(state: { user: User }) {
    state.user.userImg = ''
  },
  SetFetchUserProfile(state: ProfileData, { info, links, headers, theme }: PayloadData) {
    state.profileInfo = info;
    state.theme = theme || {};

    state.profileLinks = links;
    state.profileLinks = state.profileLinks
      .filter((link: Link) => link.isDisable !== false)
      .sort((a: { dataIndex: number }, b: { dataIndex: number }) => a.dataIndex - b.dataIndex);

    state.profileHeaders = headers
    state.profileHeaders = state.profileHeaders
      .filter((header: HeaderWithId) => header.isDisable !== false)
      .sort((a: { dataIndex: number }, b: { dataIndex: number }) => a.dataIndex - b.dataIndex);
  },
  setLinkRealTime(state: { profileLinks: Link[] }, payload: Link) {
    state.profileLinks.unshift(payload);
  },
  setDeleteLinkRealTime(state: { profileLinks: Link[] }, payload: string) {
    state.profileLinks = state.profileLinks.filter((link) => {
      return link.id !== payload;
    })
  }
}
