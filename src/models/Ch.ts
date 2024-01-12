import Sequence from "@common/Sequence";

export type Ch = {
  tuneId: string;
  connection: string;
  connections: string[];
  type: string;
  liveCnt: number;
  favicon: string;
  active: boolean;
};

export const init: Ch = {
  tuneId: "",
  connection: "",
  connections: [],
  type: "",
  liveCnt: 0,
  favicon: "",
  active: false,
};

export type GetChPropsParams = {
  tuneId: string;
  host: string;
  connection: string;
  liveCnt: number;
};

export default class ChModel {
  static separetor = "/";
  static rootConnection = ChModel.separetor;
  static connectionSeparator = "/";
  static defaultProtocol = "talkn::";
  static defultType = "text/html";
  static plainType = "plain";
  constructor(params: Partial<Ch> = init) {
    return Object.assign(this, params);
  }
  static getConnection(connection: string) {
    if (connection === "") return ChModel.rootConnection;
    return connection.endsWith(ChModel.rootConnection)
      ? connection
      : `${connection}${ChModel.rootConnection}`;
  }
  static getConnectionFromRequest(host: string, url: string): string {
    const requestUrl = String(url);
    const pathname = new URL(requestUrl, `https://${host}`).pathname;
    return pathname.replace("/socket.io", ""); // TODO: コネクション取得ルールが不安定
  }

  static getFavicon(host: string) {
    return host.endsWith(ChModel.rootConnection)
      ? `${host}favicon.ico`
      : `${host}${ChModel.rootConnection}favicon.ico`;
  }
  static getConnections(connection: string) {
    let connections = [ChModel.rootConnection];
    if (connection !== ChModel.rootConnection) {
      const connectionArr = connection
        .split(ChModel.connectionSeparator)
        .filter((part) => part !== "");
      let connectionPart = "";
      for (const part of connectionArr) {
        connectionPart += ChModel.rootConnection + part;
        connectionPart = connectionPart.endsWith(ChModel.separetor)
          ? connectionPart
          : `${connectionPart}${ChModel.separetor}`;
        connections.push(connectionPart);
      }
    }
    return connections;
  }

  static getType(host: string) {
    return host.startsWith(Sequence.HTTPS_PROTOCOL) ||
      host.startsWith(Sequence.HTTP_PROTOCOL)
      ? ChModel.defultType
      : ChModel.plainType;
  }

  static getChParams = (params: GetChPropsParams): Partial<Ch> => {
    const { tuneId, connection: _connection, host, liveCnt } = params;
    const connection = ChModel.getConnection(_connection);
    const connections = ChModel.getConnections(connection);
    const favicon = ChModel.getFavicon(host);
    const type = ChModel.getType(host);
    return {
      tuneId,
      connection,
      connections,
      favicon,
      type,
      liveCnt,
    };
  };
}
