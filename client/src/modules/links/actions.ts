import { HeaderLinks, HeaderWithId } from '@/types/interfacesHeader';
import { link } from '@/types/interfacesLink';
import { ActionContext } from 'vuex';

const URL_SERVER = 'http://localhost:2024/admin/'

function serverError(req: Response, res: { message: string }, messErr: string) {
  if (!req.ok) {
    const error = new Error(messErr) || res.message || 'Unknown error';
    throw error;
  }
};

export default {
  // HEADERS
  async addHeaderLink({ commit }: ActionContext<HeaderLinks, any>, payload: HeaderLinks) {

    const header = {
      title: payload.title,
      isDisable: payload.isDisable,
      dataIndex: payload.dataIndex,
    };

    const req = await fetch(`${ URL_SERVER }header`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(header)
    });

    const res = await req.json();
    const id = res.header._id;

    serverError(req, res, 'failed to create header');

    commit('setAddHeaderLink', { ...payload, id: id });
  },
  async featchHeaders({ commit }: ActionContext<HeaderLinks, any>) {

    const req = await fetch(`${ URL_SERVER }headers`);
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

    commit('setFeatchHeaders', headers);
  },
  async deleteHeaderLink({ commit }: ActionContext<HeaderLinks, any>, id: string) {
    const req = await fetch(`${ URL_SERVER }delete-header/${ id }`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const res: { message: string } = await req.json();

    serverError(req, res, 'failed to delete header');

    commit('setDeleteHeaderLink', id);
  },
  async updateHeader(_context: ActionContext<HeaderLinks, any>, payload: HeaderWithId) {
    const req = await fetch(`${ URL_SERVER }update-header/${ payload.id }`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const res: { message: string } = await req.json();

    serverError(req, res, 'failed to update header');
  },
  async updateHideHeader(_context: ActionContext<HeaderLinks, any>, payload: HeaderWithId) {
    const req = await fetch(`${ URL_SERVER }update-header-checkbox/${ payload.id }`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const res: { message: string } = await req.json();

    serverError(req, res, 'failed to change state')
  },
  async updateHeaderOrder({ state }: ActionContext<HeaderLinks, any>, payload: HeaderWithId) {
    state.headerLinks = payload

    const req = await fetch(`${ URL_SERVER }update-headers-orders`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const res: { message: string } = await req.json();

    serverError(req, res, 'Update Orders fails!!');
  },
  // LINKS
  // ADD LINK
  async addLink({ commit }: ActionContext<link, any>, payload: any) {
    commit('setAddLink', payload)
  },
  // UPDATE TITLE
  async updateLinkTitle({ commit }: ActionContext<link, any>, payload: any) {
    commit('setUpdateLinkTitle', payload);
  },
  async updateLink({ commit }: ActionContext<link, any>, payload: any) {
    commit('setUpdateLink', payload);
  },
  async updateHideLink({ commit }: ActionContext<link, any>, payload: any) {
    commit('setUpdateHideLink', payload);
  },
  // LAYOUT
  async updateLayout({ commit }: ActionContext<link, any>, payload: any) {
    commit('setUpdateLayout', payload);
  },
  // BOXICONS
  async updateChooseBoxicon({ commit }: ActionContext<link, any>, payload: any) {
    commit('setUpdateChooseBoxicon', payload);
  },
  // DELETE TITLE
  async deleteLink({ commit }: ActionContext<link, any>, payload: string) {
    commit('setDeleteLink', payload);
  }
};
