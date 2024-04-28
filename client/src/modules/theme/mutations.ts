import { Theme } from '@/types/interfacesTheme';

export default {
  setSelectedTheme(state: { theme: Theme }, payload: Theme) {
    state.theme = payload;
  },
  setChangeBgClr(state: { theme: Theme }, payload: string) {
    state.theme.bgClr = payload;
  }
}
