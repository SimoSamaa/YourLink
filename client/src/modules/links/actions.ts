import { HeaderLinks, HeaderWithId } from '@/types/interfacesHeader';
import { serverError } from '@/hooks/helpers';
import { Link } from '@/types/interfacesLink';
import { ActionContext } from 'vuex';

const URL_SERVER = process.env.VUE_APP_URL + 'admin/';

export default {
  // HEADERS
  async addHeaderLink({ commit, rootGetters }: ActionContext<HeaderLinks, any>, payload: HeaderLinks) {
    const token = rootGetters[ 'auth/token' ];
    const header = {
      title: payload.title,
      isDisable: payload.isDisable,
      dataIndex: payload.dataIndex,
    };

    const req = await fetch(`${URL_SERVER}header`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(header)
    });

    const res: { message: string, header: Record<string, HeaderWithId & { _id: string }> } = await req.json();
    const id = res.header._id;

    serverError(req, res, 'failed to create header');

    commit('setAddHeaderLink', { ...payload, id: id });
  },
  async featchHeaders(context: ActionContext<HeaderLinks, any>) {
    const token = context.rootGetters[ 'auth/token' ];
    const req = await fetch(`${URL_SERVER}headers`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const res: { message: string, headers: Record<string, HeaderWithId & { _id: string }> } = await req.json();
    const resHeader: Record<string, HeaderWithId & { _id: string }> = res.headers;
    const headers: HeaderWithId[] = [];

    serverError(req, res, 'failed to load headers');

    for (const key in resHeader) {
      const headerData: HeaderWithId = {
        id: resHeader[ key ]._id,
        title: resHeader[ key ].title,
        dataIndex: resHeader[ key ].dataIndex,
        isDisable: resHeader[ key ].isDisable
      };

      headers.unshift(headerData);
    }

    context.commit('setFeatchHeaders', headers);
  },
  async deleteHeaderLink({ commit, rootGetters }: ActionContext<HeaderLinks, any>, id: string) {
    const token = rootGetters[ 'auth/token' ];
    const req = await fetch(`${URL_SERVER}delete-header/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const res: { message: string } = await req.json();

    serverError(req, res, 'failed to delete header');

    commit('setDeleteHeaderLink', id);
  },
  async updateHeader({ rootGetters }: ActionContext<HeaderLinks, any>, payload: HeaderWithId) {
    const token = rootGetters[ 'auth/token' ];
    const req = await fetch(`${URL_SERVER}update-header/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const res: { message: string } = await req.json();

    serverError(req, res, 'failed to update header');
  },
  async updateHideHeader({ rootGetters }: ActionContext<HeaderLinks, any>, payload: HeaderWithId) {
    const token = rootGetters[ 'auth/token' ];
    const req = await fetch(`${URL_SERVER}update-header-checkbox/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const res: { message: string } = await req.json();

    serverError(req, res, 'failed to change state')
  },
  async updateHeaderOrder({ state, rootGetters }: ActionContext<HeaderLinks, any>, payload: HeaderWithId) {
    state.headerLinks = payload
    const token = rootGetters[ 'auth/token' ];
    const req = await fetch(`${URL_SERVER}update-headers-orders`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const res: { message: string } = await req.json();

    serverError(req, res, 'Update Orders fails!!');
  },
  // LINKS
  // ADD LINK
  async addLink({ commit, rootGetters }: ActionContext<Link, any>, payload: any) {
    const token = rootGetters[ 'auth/token' ]
    const req = await fetch(`${URL_SERVER}link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    const res = await req.json();
    const id = res.link._id;

    serverError(req, res, 'failed to create link');

    commit('setAddLink', { ...payload, id: id })
  },
  async fetchLinks(context: ActionContext<Link, any>) {
    const token = context.rootGetters[ 'auth/token' ];
    const req = await fetch(`${URL_SERVER}links`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    const res = await req.json()
    const resLinks = res.links;
    const links = [];

    serverError(req, res, 'failed to load links');

    for (const key in resLinks) {
      const linksData = {
        id: resLinks[ key ]._id,
        title: resLinks[ key ].title,
        link: resLinks[ key ].link,
        layout: resLinks[ key ].layout,
        icon: resLinks[ key ].icon,
        dataIndex: resLinks[ key ].dataIndex,
        isDisable: resLinks[ key ].isDisable
      };

      links.unshift(linksData);
    }

    context.commit('setFetchLinks', links)
  },
  // UPDATE TITLE
  async updateLinkTitle({ commit, rootGetters }: ActionContext<Link, any>, payload: any) {
    const token = rootGetters[ 'auth/token' ];
    const req = await fetch(`${URL_SERVER}update-title-link/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    const res: { message: string } = await req.json();
    serverError(req, res, 'failed to update title link');

    commit('setUpdateLinkTitle', payload);
  },
  async updateLink({ commit, rootGetters }: ActionContext<Link, any>, payload: any) {
    const token = rootGetters[ 'auth/token' ];
    const req = await fetch(`${URL_SERVER}update-url-link/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    const res: { message: string } = await req.json();
    serverError(req, res, 'failed to update URL link');

    commit('setUpdateLink', payload);
  },
  async updateHideLink({ commit, rootGetters }: ActionContext<Link, any>, payload: any) {
    const token = rootGetters[ 'auth/token' ];
    const req = await fetch(`${URL_SERVER}update-hidden-link/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    const res: { message: string } = await req.json();
    serverError(req, res, 'failed to change state')

    commit('setUpdateHideLink', payload);
  },
  // LAYOUT
  async updateLayout({ commit, rootGetters }: ActionContext<Link, any>, payload: any) {
    const token = rootGetters[ 'auth/token' ];
    const req = await fetch(`${URL_SERVER}update-layout-link/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    const res: { message: string } = await req.json();
    serverError(req, res, 'failed to update layout')
    commit('setUpdateLayout', payload);
  },
  // BOXICONS
  async updateChooseBoxicon({ commit, rootGetters }: ActionContext<Link, any>, payload: any) {
    const token = rootGetters[ 'auth/token' ];
    const req = await fetch(`${URL_SERVER}update-icon-link/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    const res: { message: string } = await req.json();
    serverError(req, res, 'failed to update layout')

    commit('setUpdateChooseBoxicon', payload);
  },
  // DELETE TITLE
  async deleteLink({ commit, rootGetters }: ActionContext<Link, any>, id: string) {
    const token = rootGetters[ 'auth/token' ];
    const req = await fetch(`${URL_SERVER}delete-link/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    });

    const res: { message: string } = await req.json();

    serverError(req, res, 'failed to delete link');

    commit('setDeleteLink', id);
  },
  async updateLinksOrder({ state, rootGetters }: ActionContext<{ links: Link }, any>, payload: Link) {
    state.links = payload
    const token = rootGetters[ 'auth/token' ];
    const req = await fetch(`${URL_SERVER}update-links-orders`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    const res: { message: string } = await req.json();

    serverError(req, res, 'Update Orders fails!!');
  }
};
