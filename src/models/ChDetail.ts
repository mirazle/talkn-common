import ChModel from "./Ch";
import Ch from "./Ch";

export type ChDetail = {
  id: string;
  connection: string;
};

export default class ChDetailModel {
  id: string;
  connection: string;
  constructor(params: Partial<ChDetail> = init) {
    this.id = params?.id || "";
    this.connection = params?.connection || Ch.rootConnection;
  }
}

export const init: ChDetail = {
  id: "",
  connection: "",
};
