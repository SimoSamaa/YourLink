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
          bgImg: 'bg-[#26A380]',
          logo: 'invert',
          name: 'mint',
        },
        {
          page: 'bg-them-blue-circle text-white',
          link: 'bg-opacity-0 border-white border-2',
          bgImg: 'bg-[#3aa1ea]',
          logo: 'invert',
          name: 'blue circle',
        },
        {
          page: 'bg-[#E0F6FF] text-black2',
          link: 'bg-opacity-0 border-[#B3C5CC] border-2',
          bgImg: 'bg-[#061492] text-white',
          name: 'mineral blue',
        },
        {
          page: 'bg-[#E0FAEE] text-black2',
          link: 'bg-opacity-0 border-[#B3C5CC] border-2',
          bgImg: 'bg-[#254F1A] text-white',
          name: 'mineral green',
        },
        {
          page: 'bg-white',
          link: 'bg-[#EBEEF1] rounded-md',
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
          bgImg: 'bg-[#F5F6F8] text-black',
          name: 'air smoke',
          logo: 'invert',
        },
        {
          page: 'bg-black text-white',
          link: 'bg-[#222222] rounded-md text-white',
          bgImg: 'bg-[#F5F6F8] text-black',
          name: 'air black',
          logo: 'invert',
        },
      ] as Theme[],
      theme: {} as Theme
    }
  },
  mutations: themeMutations,
  actions: themeActions,
  getters: themeGetters,
}
