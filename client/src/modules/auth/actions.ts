import { serverError, handleRequest } from '@/hooks/helpers';
import { Signup, Login } from '@/types/interfacesAuth'
import { ActionContext, Commit } from 'vuex';

type CommitType = { commit: Commit };
type ResType = { message: string, token: string, userId: string };

export default {
  async signup(_context: ActionContext<any, any>, payload: Signup) {
    const [ req, res ] = await handleRequest<ResType>('auth/signup', 'POST', null, payload);
    serverError(req, res, 'E-mail address already exists');
  },
  async login({ commit }: CommitType, payload: Login) {
    const [ req, res ] = await handleRequest<ResType>('auth/login', 'POST', null, payload);
    serverError(req, res, 'Invalid email or password');

    localStorage.setItem('token', res.token);
    localStorage.setItem('userId', res.userId);

    commit('setUser', {
      token: res.token,
      userId: res.userId,
      tokenExp: null
    })
  },
  autoLogin({ commit }: CommitType) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      commit('setUser', {
        token: token,
        userId: userId,
        tokenExp: null
      })
    }
  },
  logout({ commit }: CommitType) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    commit('setUser', {
      token: null,
      userId: null,
      tokenExp: null
    })
  }
}
