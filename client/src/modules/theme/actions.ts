import { ActionContext, Commit } from 'vuex';
import { serverError, handleRequest } from '@/hooks/helpers';
import { Theme } from '@/types/interfacesTheme';

type resType = { message: string, theme: Theme };

export default {
  async selectedTheme(context: ActionContext<Commit, null>, payload: Theme) {
    const token = context.rootGetters[ 'auth/token' ];
    const [ req, res ] = await handleRequest<resType>('admin/selected-theme', 'PUT', token, payload);
    serverError(req, res, 'failed to select theme');
    context.commit('setSelectedTheme', payload);
  },
  async fetchTheme(context: ActionContext<Commit, null>) {
    const token = context.rootGetters[ 'auth/token' ];
    const [ req, res ] = await handleRequest<resType>('admin/theme', null, token, null);
    serverError(req, res, res.message);

    const theme = {
      page: res.theme.page,
      link: res.theme.link,
      name: res.theme.name,
      logo: res.theme.logo,
      bgImg: res.theme.bgImg,
      bgClr: res.theme.bgClr
    }

    context.commit('setSelectedTheme', theme);
  },
  async changeBgClr(context: ActionContext<Commit, null>, payload: string) {
    const token = context.rootGetters[ 'auth/token' ];
    const [ req, res ] = await handleRequest<resType>('admin/change-bgClr', 'PUT', token, { hexClr: payload });
    serverError(req, res, 'failed to select theme');
    context.commit('setChangeBgClr', payload);
  }
};
