import themeMutations from './mutations';
import themeActions from './actions';
import themeGetters from './getters';

import { Theme } from '@/types/interfacesTheme';

export default {
  namespaced: true,
  state() {
    return {
      themes: [
        {
          page: 'bg-theme-noir text-border',
          link: 'bg-opacity-0 border-border border-2',
          bgImg: 'bg-border text-black2',
          logo: 'invert',
          name: 'noir',
        },
        {
          page: 'bg-theme-mint text-white',
          link: 'bg-opacity-0 border-white border-2',
          bgImg: 'bg-green-700',
          logo: 'invert',
          name: 'mint',
        },
        {
          page: 'bg-them-blue-circle text-white',
          link: 'bg-opacity-0 border-white border-2',
          bgImg: 'bg-sky-700',
          logo: 'invert',
          name: 'blue circle',
        },
        {
          page: 'bg-[#E0F6FF] text-black2',
          link: 'bg-opacity-0 border-[#B3C5CC] border-2',
          bgImg: 'bg-blue-700 text-white',
          name: 'mineral blue',
        },
        {
          page: 'bg-[#E0FAEE] text-black2',
          link: 'bg-opacity-0 border-[#B3C5CC] border-2',
          bgImg: 'bg-green-700 text-white',
          name: 'mineral green',
        },
        {
          page: 'bg-white',
          link: 'bg-gray-100 rounded-md',
          name: 'air white',
        },
        {
          page: 'bg-[#EBEEF1]',
          link: 'bg-white rounded-md',
          name: 'air gray',
        },
        {
          page: 'bg-[#2A3235] text-white',
          link: 'bg-white rounded-md text-black2',
          bgImg: 'bg-border text-black',
          logo: 'invert',
          name: 'air smoke',
        },
        {
          page: 'bg-black text-white',
          link: 'rounded-md text-white bg-gray-700',
          bgImg: 'bg-gray-700',
          logo: 'invert',
          name: 'air black',
        },
      ] as Theme[],
      theme: {} as Theme
    }
  },
  mutations: themeMutations,
  actions: themeActions,
  getters: themeGetters,
}
