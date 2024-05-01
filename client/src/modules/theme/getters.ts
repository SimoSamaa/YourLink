import { Theme, LinksStyleArray } from '@/types/interfacesTheme'

export default {
  theme(state: { theme: Theme }) {
    return state.theme;
  },
  themes(state: { themes: Theme[] }) {
    return state.themes;
  },
  linksStyle(state: { linksStyle: LinksStyleArray }) {
    return state.linksStyle;
  }
}
