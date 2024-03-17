import { serverError } from '@/hooks/helpers';
import { Signup, Login } from '@/types/interfacesAuth'
import { ActionContext, Commit } from 'vuex';

const URL_SERVER = 'http://localhost:2024/auth/';

type CommitType = { commit: Commit };
type ResType = { message: string, token: string, userId: string };


async function handleRequest<T>(url: string, method: string, payload: any): Promise<[ Response, T ]> {
  const req = await fetch(`${ URL_SERVER }${ url }`, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const res = await req.json();

  return [ req, res ]
}

export default {
  async signup(_context: ActionContext<any, any>, payload: Signup) {
    const [ req, res ] = await handleRequest<ResType>('signup', 'POST', payload);
    serverError(req, res, 'E-mail address already exists');
  },
  async login({ commit }: CommitType, payload: Login) {
    const [ req, res ] = await handleRequest<ResType>('login', 'POST', payload);
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
