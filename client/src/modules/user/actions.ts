import { ActionContext } from 'vuex';
import { serverError, handleRequest } from '@/hooks/helpers';
import openSocket from 'socket.io-client';
import { User } from '@/types/interfacesAuth';
import { Theme } from '@/types/interfacesTheme';
import { Link } from '@/types/interfacesLink';
import { HeaderWithId } from '@/types/interfacesHeader';

type resType = { message: string, user: User };
type ProfileData = {
  message: string,
  user: {
    username: string,
    userImg: string,
    bio: string,
    theme: Theme,
    headers: HeaderWithId[],
    links: Link[]
  }
};

export default {
  async fetchUser(context: ActionContext<{ user: User }, any>) {
    const token = context.rootGetters[ 'auth/token' ];
    const userId = context.rootGetters[ 'auth/userId' ];

    const [ req, res ] = await handleRequest<resType>(`user/${userId}`, null, token, null);

    serverError(req, res, res.message);

    const userImg = !res.user.userImg ? res.user.userImg : process.env.VUE_APP_URL + res.user.userImg
    const user = {
      email: res.user.email,
      username: res.user.username,
      bio: res.user.bio,
      userImg: userImg,
      createdAt: res.user.createdAt
    }
    context.commit('setUser', user);
  },
  async updateProfil(context: ActionContext<{ user: User }, any>, payload: User) {
    const userId = context.rootGetters[ 'auth/userId' ];
    const token = context.rootGetters[ 'auth/token' ];

    const formData = new FormData()
    formData.append('username', payload.username);
    formData.append('userImg', payload.userImg);
    formData.append('bio', payload.bio);

    const [ req, res ] = await handleRequest<resType>(`update-profile/${userId}`, 'PUT', token, formData, 'html');

    serverError(req, res, res.message);
    const userImg = !res.user.userImg ? res.user.userImg : process.env.VUE_APP_URL + res.user.userImg
    context.commit('setUpdateProfil', { ...payload, userImg: userImg });
  },
  async removeImgUser(context: ActionContext<{ user: User }, any>) {
    const userId = context.rootGetters[ 'auth/userId' ];
    const token = context.rootGetters[ 'auth/token' ];

    const [ req, res ] = await handleRequest<resType>(`remove-image/${userId}`, 'DELETE', token, null);

    serverError(req, res, res.message);

    context.commit('setRemoveImgUser');
  },
  async fetchUserProfile({ commit, rootGetters }: ActionContext<any, any>, payload: string) {
    const [ req, res ] = await handleRequest<ProfileData>(payload, null, null, null);
    serverError(req, res, res.message);
    const info = {
      username: res.user.username,
      userImg: res.user.userImg,
      bio: res.user.bio,
    }

    const linkData = res.user.links;
    const links: Link[] = []
    for (const key in linkData) {
      const data: Link = {
        id: linkData[ key ]._id,
        title: linkData[ key ].title,
        link: linkData[ key ].link,
        layout: linkData[ key ].layout,
        icon: linkData[ key ].icon,
        dataIndex: linkData[ key ].dataIndex,
        isDisable: linkData[ key ].isDisable,
      }

      links.unshift(data)
    }

    const headerData = res.user.headers;
    const headers: HeaderWithId[] = []
    for (const key in headerData) {
      const data: HeaderWithId = {
        id: headerData[ key ]._id,
        title: headerData[ key ].title,
        dataIndex: headerData[ key ].dataIndex,
        isDisable: headerData[ key ].isDisable
      }

      headers.unshift(data)
    }

    const theme: Theme = res.user.theme;
    const isAuth = rootGetters[ 'auth/isAuth' ];
    if (isAuth) {
      const socket = openSocket(String(`${process.env.VUE_APP_URL}`));
      socket.on('link', (data) => {
        if (data.action === 'create') {
          commit('setLinkRealTime', {
            id: data.link._id,
            title: data.link.title,
            link: data.link.link,
            layout: data.link.layout,
            icon: data.link.icon,
            dataIndex: data.link.dataIndex,
            isDisable: data.link.isDisable,
          });
        } else if (data.action === 'delete') {
          commit('setDeleteLinkRealTime', data.deleteLinkId);
        }
      })
    }

    commit('SetFetchUserProfile', { info, links, headers, theme });
  },
  async deleteUserAccount(context: ActionContext<any, any>) {
    const userId = context.rootGetters[ 'auth/userId' ];
    const token = context.rootGetters[ 'auth/token' ];
    const [ req, res ] = await handleRequest<resType>(`delete-account/${userId}`, 'DELETE', token, null);
    serverError(req, res, res.message);
  }
};
