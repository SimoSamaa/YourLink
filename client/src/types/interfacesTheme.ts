
interface Theme {
  page: string,
  link: string,
  name: string;
  bgImg?: string | undefined,
  logo?: string | undefined,
  bgClr?: string | undefined,
  linkClr?: string | undefined,
  fontLinkClr?: string | undefined,
  shadowlinkClr?: string | undefined,
};

type LinkStyle = {
  fill: string;
  outline: string;
  softShadow: string;
  hardShadow: string;
};

type LinksStyleArray = Array<Array<LinkStyle>>;

export { Theme, LinksStyleArray, LinkStyle }
