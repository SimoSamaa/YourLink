import themeMutations from './mutations';
import themeActions from './actions';
import themeGetters from './getters';

import { Theme, LinksStyleArray } from '@/types/interfacesTheme';



export default {
  namespaced: true,
  state() {
    return {
      themes: [
        {
          page: 'bg-theme-noir text-border',
          link: 'link bg-opacity-0 border-border border-2',
          bgImg: 'bg-border text-black2',
          logo: 'invert',
          name: 'noir',
        },
        {
          page: 'bg-theme-mint text-white',
          link: 'link bg-opacity-0 border-white border-2',
          bgImg: 'bg-green-700',
          logo: 'invert',
          name: 'mint',
        },
        {
          page: 'bg-theme-blue-circle text-white',
          link: 'link bg-opacity-0 border-white border-2',
          bgImg: 'bg-sky-700',
          logo: 'invert',
          name: 'blue circle',
        },
        {
          page: 'bg-[#E0F6FF] text-black2',
          link: 'link bg-opacity-0 border-[#B3C5CC] border-2',
          bgImg: 'bg-blue-700 text-white',
          name: 'mineral blue',
        },
        {
          page: 'bg-[#E0FAEE] text-black2',
          link: 'link bg-opacity-0 border-[#B3C5CC] border-2',
          bgImg: 'bg-green-700 text-white',
          name: 'mineral green',
        },
        {
          page: 'bg-white',
          link: 'link bg-gray-100 rounded-md',
          name: 'air white',
        },
        {
          page: 'bg-[#EBEEF1]',
          link: 'link bg-white rounded-md',
          name: 'air gray',
        },
        {
          page: 'bg-[#2A3235] text-white',
          link: 'link bg-white rounded-md text-black2',
          bgImg: 'bg-border text-black',
          logo: 'invert',
          name: 'air smoke',
        },
        {
          page: 'bg-black text-white',
          link: 'link rounded-md text-white bg-gray-700',
          bgImg: 'bg-gray-700',
          logo: 'invert',
          name: 'air black',
        },
      ] as Theme[],
      linksStyle: [
        [
          { fill: 'rounded-none bg-black2' },
          { fill: 'rounded-md bg-black2' },
          { fill: 'rounded-3xl bg-black2' }
        ],
        [
          { outline: 'rounded-none border-black2 border line' },
          { outline: 'rounded-md border-black2 border line' },
          { outline: 'rounded-3xl border-black2 border line' }
        ],
        [
          { softShadow: 'rounded-none shadow-[0_4px_4px_0_rgb(0,0,0,0.16)] soft' },
          { softShadow: 'rounded-md shadow-[0_4px_4px_0_rgb(0,0,0,0.16)] soft' },
          { softShadow: 'rounded-3xl shadow-[0_4px_4px_0_rgb(0,0,0,0.16)] soft' }
        ],
        [
          { hardShadow: 'rounded-none border-black2 border shadow-[4px_4px_0_0_black] hard' },
          { hardShadow: 'rounded-md border-black2 border shadow-[4px_4px_0_0_black] hard' },
          { hardShadow: 'rounded-3xl border-black2 border shadow-[4px_4px_0_0_black] hard' }
        ],
      ] as LinksStyleArray,
      theme: {} as Theme
    }
  },
  mutations: themeMutations,
  actions: themeActions,
  getters: themeGetters,
}
