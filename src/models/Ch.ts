import Sequence from "@common/Sequence";

export type Ch = {
  id: string;
  connection: string;
  connections: string[];
  type: string;
  liveCnt: number;
  favicon: string;
  active: boolean;
};

export const init: Ch = {
  id: "",
  connection: "",
  connections: [],
  type: "",
  liveCnt: 0,
  favicon: "",
  active: false,
};

export default class ChModel {
  static rootConnection = "/";
  static connectionSeparator = "/";
  static defaultProtocol = "talkn::";
  static defultType = "text/html";
  static plainType = "plain";
  constructor(params: Partial<Ch> = init) {
    return Object.assign(this, params);
  }
}
