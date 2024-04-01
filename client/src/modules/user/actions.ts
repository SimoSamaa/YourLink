import { ActionContext } from 'vuex';
import { serverError, handleRequest } from '@/hooks/helpers';
import { User } from '@/types/interfacesAuth';

type resType = { message: string, user: User };

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
  async fetchUserProfile({ commit }: any, payload: any) {
    const [ req, res ] = await handleRequest<any>(payload, null, null, null);
    serverError(req, res, res.message);
    const info = {
      username: res.user.username,
      userImg: res.user.userImg,
      bio: res.user.bio,
    }

    const linkData = res.user.links;
    const links: any = []
    for (const key in linkData) {
      const data = {
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
    const headers: any = []
    for (const key in headerData) {
      const data = {
        id: headerData[ key ]._id,
        title: headerData[ key ].title,
        dataIndex: headerData[ key ].dataIndex,
        isDisable: headerData[ key ].isDisable
      }

      headers.unshift(data)
    }

    commit('SetFetchUserProfile', { info, links, headers });
  },
  async deleteUserAccount(context: any) {
    const userId = context.rootGetters[ 'auth/userId' ];
    const token = context.rootGetters[ 'auth/token' ];
    const [ req, res ] = await handleRequest<resType>(`delete-account/${userId}`, 'DELETE', token, null);
    serverError(req, res, res.message);
  }
};
