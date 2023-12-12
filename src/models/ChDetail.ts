import ChModel from './Ch';
import Ch from './Ch';

export type ChDetail = {
  id: string;
  connection: string;
};

export default class ChDetailModel {
  id: string;
  connection: string;
  constructor(props: Partial<ChDetail> = init) {
    this.id = props?.id || '';
    this.connection = props?.connection || Ch.rootConnection;
  }
}

export const init: ChDetail = {
  id: '',
  connection: '',
};
