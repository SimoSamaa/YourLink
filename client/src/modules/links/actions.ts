import { HeaderLinks } from '../../types/interfaces';
import { ActionContext } from 'vuex';

const URL_SERVER = 'http://localhost:2024/admin/'

export default {
  async addHeaderLink({ commit }: ActionContext<HeaderLinks, any>, paylaod: HeaderLinks) {

    const header = {
      title: paylaod.title,
      isDisable: paylaod.isDisable,
      dataIndex: paylaod.dataIndex,
    };

    const req = await fetch(`${ URL_SERVER }header`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(header)
    });

    const res = await req.json()
    const id = res.header._id;
    if (!req.ok) return

    commit('setAddHeaderLink', { ...paylaod, id: id });
  },
  async featchHeaders({ commit }: ActionContext<HeaderLinks, any>) {

    interface Header {
      id: string;
      title: string;
      dataIndex: string;
      isDisable: boolean;
    }

    const req = await fetch(`${ URL_SERVER }headers`);
    const res = await req.json();
    const resHeader: Record<string, Header & { _id: string }> = res.headers;
    const headers: Header[] = [];

    if (!req.ok) {
      const error =
        new Error('failed to load headers') ||
        res.message;
      throw error
    }

    for (const key in resHeader) {
      const headerData: Header = {
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

    const res = await req.json();

    commit('setDeleteHeaderLink', id);
  },
  async updateHeader({ commit }: ActionContext<HeaderLinks, any>, paylaod: any) {
    const req = await fetch(`${ URL_SERVER }update-header/${ paylaod.id }`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paylaod)
    });

    // console.log('edit', paylaod);

    commit('setUpdateHeader', paylaod)
  },
  UpdateHeaderOrder({ commit }: ActionContext<HeaderLinks, any>, payload: any) {

    commit('setHeaderOrder', payload);
  }
};
