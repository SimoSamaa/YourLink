import ResetPassword from '@/components/ResetPassword.vue';
import { serverError, handleRequest } from '@/hooks/helpers';
import { Signup, Login } from '@/types/interfacesAuth'
import { ActionContext, Commit, Dispatch } from 'vuex';

type ContextType = { commit: Commit, dispatch: Dispatch };
type ResType = { message: string, token: string, userId: string, expiresIn: number };

let timer: number | undefined;

export default {
  async signup(_context: ActionContext<any, any>, payload: Signup) {
    const [ req, res ] = await handleRequest<ResType>('auth/signup', 'POST', null, payload);
    serverError(req, res, 'E-mail address already exists');
  },
  async login(context: ContextType, payload: Login) {
    const [ req, res ] = await handleRequest<ResType>('auth/login', 'POST', null, payload);
    serverError(req, res, 'Invalid email or password');

    // const expiresIn = 5000;
    const expiresIn = res.expiresIn;
    const expirationDate = Date.now() + expiresIn;
    localStorage.setItem('token', res.token);
    localStorage.setItem('userId', res.userId);
    localStorage.setItem('tokenExpiration', expirationDate.toString());

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: res.token,
      userId: res.userId,
    })
  },
  autoLogin(context: ContextType) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = Number(tokenExpiration) - Date.now();
    if (expiresIn < 0) return;

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      })
    }
  },
  logout({ commit }: ContextType) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    commit('setUser', {
      token: null,
      userId: null,
    })
  },
  autoLogout(context: ContextType) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
  async resetPassword(_context: ContextType, payload: string) {
    const [ req, res ] = await handleRequest<ResType>('auth/reset-password', 'POST', null, payload);
    serverError(req, res, 'email not exists');
  },
  async newPassword(_context: ContextType, payload: { token: string, newPass: string }) {
    const [ req, res ] = await handleRequest<ResType>(
      `auth/new-password/${payload.token}`, 'POST', null, { newPass: payload.newPass }
    );
    serverError(req, res, 'confirm your password');
  }
}
