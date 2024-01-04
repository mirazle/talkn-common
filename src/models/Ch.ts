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

export type GetChPropsParams = {
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
    const { connection: _connection, host, liveCnt } = params;
    const connection = ChModel.getConnection(_connection);
    const connections = ChModel.getConnections(connection);
    const favicon = ChModel.getFavicon(host);
    const type = ChModel.getType(host);
    return {
      connection,
      connections,
      favicon,
      type,
      liveCnt,
    };
  };
}
