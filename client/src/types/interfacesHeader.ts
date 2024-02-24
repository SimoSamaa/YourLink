interface Header {
  title: string;
  dataIndex: number;
  isDisable: boolean;
};

interface HeaderWithId extends Header {
  id: string;
}

interface HeaderLinks extends Header {
  headerLinks: HeaderWithId;
  id: string;
  isEdit: boolean,
  isOpenDelete: boolean,
  isDrag: boolean,
  oldTitle: string
}

export { HeaderLinks, Header, HeaderWithId }
