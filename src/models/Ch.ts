import Sequence from "@common/Sequence";
import { Contract } from "@common/models/Contract";
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
  contract?: Contract;
};

export type ParentConnection = string | undefined;
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
    isSelfExclude = false
  ) {
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
    return connections;
  }

  static getType(host: string) {
    return host.startsWith(Sequence.HTTPS_PROTOCOL) ||
      host.startsWith(Sequence.HTTP_PROTOCOL)
      ? ChModel.defultType
      : ChModel.plainType;
  }

  static getServer(contract?: Contract) {
    return contract &&
      contract.nginx.proxyWssServer &&
      contract.nginx.proxyWssPort
      ? `${contract.nginx.proxyWssServer}:${contract.nginx.proxyWssPort}`
      : `127.0.0.1:${define.PORTS.IO_ROOT}`;
  }

  static getChParams = (params: GetChPropsParams): Partial<Ch> => {
    const { tuneId, connection: _connection, host, liveCnt, contract } = params;
    const connection = ChModel.getConnection(_connection);
    const connections = ChModel.getConnections(connection);
    const favicon = ChModel.getFavicon(host);
    const type = ChModel.getType(host);
    const server = ChModel.getServer(contract);
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
