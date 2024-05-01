import { Theme } from '@/types/interfacesTheme';

export default {
  setSelectedTheme(state: { theme: Theme }, payload: Theme) {
    state.theme = payload;
  },
  setChangeBgClr(state: { theme: Theme }, payload: string) {
    state.theme.bgClr = payload;
  },
  setChangeBtnStyle(state: { theme: Theme }, payload: string) {
    state.theme.link = payload;
  },
  setBackgroundLinkClr(state: { theme: Theme }, payload: string) {
    state.theme.linkClr = payload;
  },
  setFontLinkClr(state: { theme: Theme }, payload: string) {
    state.theme.fontLinkClr = payload;
  },
  setShadowLinkClr(state: { theme: Theme }, payload: string) {
    state.theme.shadowlinkClr = payload;
  }
}
