import { ActionContext } from 'vuex';
import { serverError, handleRequest } from '@/hooks/helpers';
import { Theme } from '@/types/interfacesTheme';

type resType = { message: string, theme: Theme };

export default {
  async selectedTheme(context: ActionContext<any, any>, payload: Theme) {
    const token = context.rootGetters[ 'auth/token' ];
    const [ req, res ] = await handleRequest<resType>('admin/selected-theme', 'PUT', token, payload);
    serverError(req, res, 'failed to select theme');
    context.commit('setSelectedTheme', payload);
  },
  async fetchTheme(context: ActionContext<any, any>) {
    const token = context.rootGetters[ 'auth/token' ];
    const [ req, res ] = await handleRequest<resType>('admin/theme', null, token, null);
    serverError(req, res, res.message);

    const theme = {
      page: res.theme.page,
      link: res.theme.link,
      name: res.theme.name,
      logo: res.theme.logo,
      bgImg: res.theme.bgImg,
    }

    context.commit('setSelectedTheme', theme)
  }
};
