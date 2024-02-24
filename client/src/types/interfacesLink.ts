interface link {
  id: string
  title: string;
  link: string,
  dataIndex: number;
  isDisable: boolean;
  icon: string
}

// interface HeaderWithId extends Header {
//   id: string;
// }

// interface HeaderLinks extends Header {
//   headerLinks: HeaderWithId;
//   id: string;
//   isEdit: boolean,
//   isOpenDelete: boolean,
//   isDrag: boolean,
//   oldTitle: string
// }

export { link }
