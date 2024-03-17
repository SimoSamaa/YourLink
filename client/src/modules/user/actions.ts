import { serverError } from '@/hooks/helpers'
const URL_SERVER = 'http://localhost:2024/';

async function handleRequest<T>
  (
    url: string | null = null,
    method: string | null = null,
    token: string | null = null,
    payload: any,
    ContentType: string | null = null
  ): Promise<[ Response, T ]> {

  const fetchOptions: RequestInit = {
    method: method !== null ? method : 'GET',
    headers: {},
  };

  if (token !== null) {
    if (!fetchOptions.headers) fetchOptions.headers = {};

    (fetchOptions.headers as Record<string, string>)[ 'Authorization' ] = `Bearer ${ token }`;
  }

  if (payload !== null && ContentType === 'json') {
    (fetchOptions.headers as Record<string, string>)[ 'Content-Type' ] = 'application/json';
    fetchOptions.body = JSON.stringify(payload)
  }

  if (payload !== null && ContentType === 'html') fetchOptions.body = payload;



  const req = await fetch(`${ URL_SERVER }${ url }`, fetchOptions);
  const res = await req.json();

  return [ req, res ];
}

interface User {
  email: string;
  username: string;
  bio: string
  userImg: string
}
type resType = {
  message: string, user: User
}

export default {
  async fetchUser(context: any) {
    const token = context.rootGetters[ 'auth/token' ];
    const userId = context.rootGetters[ 'auth/userId' ];

    const [ req, res ] = await handleRequest<resType>(`user/${ userId }`, null, token, null, null);

    serverError(req, res, res.message);

    const userImg = !res.user.userImg ? res.user.userImg : "http://localhost:2024/" + res.user.userImg
    const user: User = {
      email: res.user.email,
      username: res.user.username,
      bio: res.user.bio,
      userImg: userImg
    }

    context.commit('setUser', user);
  },
  async updateProfil(context: any, payload: any) {
    const userId = context.rootGetters[ 'auth/userId' ];
    const token = context.rootGetters[ 'auth/token' ];

    const formData = new FormData()
    formData.append('username', payload.username);
    formData.append('userImg', payload.userImg);
    formData.append('bio', payload.bio);

    const [ req, res ] = await handleRequest<resType>(`update-profile/${ userId }`, 'PUT', token, formData, 'html');

    serverError(req, res, res.message);

    context.commit('setUpdateProfil', { ...payload, userImg: 'http://localhost:2024/' + res.user.userImg });
  },
  async removeImgUser(context: any,) {
    const userId = context.rootGetters[ 'auth/userId' ];
    const token = context.rootGetters[ 'auth/token' ];

    const req = await fetch(URL_SERVER + 'remove-image/' + userId, {
      headers: { 'Authorization': `Bearer ${ token }` },
      method: 'DELETE'
    })

    context.commit('setRemoveImgUser')
  }
}
