import Sequence from "@common/Sequence";
import { ChConfig } from "@common/models/ChConfig";
import define from "@common/define";
import BootOptionModel from "./BootOption";

export type Ch = {
  tuneId: string;
  connection: string;
  connections: string[];
  type: string;
  liveCnt: number;
  favicon: string;
  server: string;
  active: boolean;
};

export const init: Ch = {
  tuneId: "",
  connection: "",
  connections: [],
  type: "",
  liveCnt: 0,
  favicon: "",
  server: "",
  active: false,
};

export type GetChPropsParams = {
  tuneId: string;
  host: string;
  connection: Connection;
  liveCnt: number;
  chConfig: ChConfig | null;
};

export type GetConnectionOptions = {
  isSelfExclude?: boolean;
  isReverse?: boolean;
};

export type ParentConnection = string | undefined;
export type TuneConnection = string;
export type ChildConnection = string;
export type Connection = string;

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
  static getParentConnection(fixConnection: string): ParentConnection {
    if (fixConnection === ChModel.rootConnection) return undefined;
    let replacedConnection = fixConnection.replace(/.$/, "");
    const lastSlashIndex = replacedConnection.lastIndexOf("/");
    return replacedConnection.substring(0, lastSlashIndex + 1);
  }
  static getTopConnection(connection: string): Connection {
    if (connection === ChModel.rootConnection) return ChModel.rootConnection;
    const sep = this.separetor;
    return `${sep}${connection.split(sep)[1]}${sep}` as Connection;
  }
  static getConnection(connection: string) {
    return BootOptionModel.getConnection(connection);
  }
  static getConnectionFromRequest(host: string, url: string): string {
    const requestUrl = String(url);
    const pathname = new URL(requestUrl, `https://${host}`).pathname;
    const con = pathname.replace("/socket.io", ""); // TODO: コネクション取得ルールが不安定
    const connection = decodeURIComponent(con);
    return connection;
  }

  static getFavicon(host: string) {
    return host.endsWith(ChModel.rootConnection)
      ? `${host}favicon.ico`
      : `${host}${ChModel.rootConnection}favicon.ico`;
  }
  static getConnections(
    connection: ParentConnection | Connection,
    options: GetConnectionOptions = { isSelfExclude: false, isReverse: false }
  ) {
    const { isSelfExclude, isReverse } = options;
    let connections = [ChModel.rootConnection];
    if (connection && connection !== ChModel.rootConnection) {
      const connectionArr = connection
        .split(ChModel.connectionSeparator)
        .filter((part) => part !== "");
      let connectionPart = "";

      connectionArr.forEach((segment) => {
        connectionPart += `${this.separetor}${segment}`;
        const addConnection = `${connectionPart}${this.separetor}`;
        if (!(isSelfExclude && addConnection === connection)) {
          connections.push(addConnection);
        }
      });
    }

    if (isReverse) {
      return connections.reverse();
    } else {
      return connections;
    }
  }

  static getMyConnectionClass(
    topConnection: Connection,
    connections: Connection[]
  ): Connection[] {
    const myConnectionClass: Connection[] = [];
    for (const i in connections) {
      myConnectionClass.push(connections[i]);
      if (connections[i] === topConnection) break;
    }
    return myConnectionClass;
  }

  static getType(host: string) {
    return host.startsWith(Sequence.HTTPS_PROTOCOL) ||
      host.startsWith(Sequence.HTTP_PROTOCOL)
      ? ChModel.defultType
      : ChModel.plainType;
  }

  static getServer(chConfig: ChConfig | null) {
    return chConfig &&
      chConfig.nginx.proxyWssServer &&
      chConfig.nginx.proxyWssPort
      ? `${chConfig.nginx.proxyWssServer}:${chConfig.nginx.proxyWssPort}`
      : `127.0.0.1:${define.PORTS.IO_ROOT}`;
  }

  static getChParams = (params: GetChPropsParams): Partial<Ch> => {
    const { tuneId, connection: _connection, host, liveCnt, chConfig } = params;
    const connection = ChModel.getConnection(_connection);
    const connections = ChModel.getConnections(connection);
    const favicon = ChModel.getFavicon(host);
    const type = ChModel.getType(host);
    const server = ChModel.getServer(chConfig);
    return {
      tuneId,
      connection,
      connections,
      favicon,
      type,
      liveCnt,
      server,
    };
  };
}
