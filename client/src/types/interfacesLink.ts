// LINK TYPE
interface link {
  id: string
  title: string;
  link: string,
  dataIndex: number;
  isDisable: boolean;
  layout: string,
  icon: string
}

// BOXICINS TYPE
type PageProps = {
  categories: never[];
  icons: BoxIcons[];
};

interface BoxIcons {
  category_id: number;
  name: string;
  slug: string;
  term: never[];
  type_of_icon: string;
  _id: string;
}

type pageProps = {
  pageProps: PageProps;
};

export { link, pageProps, BoxIcons }
