export type Ch = {
  id: string;
  connection: string;
  liveCnt: number;
  isMediaCh: boolean;
  isLinkCh: boolean;
  contentType: string;
  layers: string[];
  title: string;
  favicon: string;
};

export default class ChModel {
  static rootConnection = '/';
  static defaultContentType = 'talknCh';
  constructor(props: Partial<Ch> = init) {
    return Object.assign(this, props);
  }
}

export const init: Ch = {
  id: '',
  connection: '',
  liveCnt: 0,
  contentType: '',
  isMediaCh: false,
  isLinkCh: false,
  layers: [],
  title: '',
  favicon: '',
};
