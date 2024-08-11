import Sequence from '@common/Sequence';
import { ChConfig } from '@common/models/ChConfig';
import define from '@common/define';
import BootOptionModel from './BootOption';

export type Ch = {
  tuneId: string;
  connection: string;
  connections: string[];
  type: string;
  liveCnt: number;
  favicon: string;
  gateway: string;
  server: string;
  active: boolean;
};

export const init: Ch = {
  tuneId: '',
  connection: '',
  connections: [],
  type: '',
  liveCnt: 0,
  favicon: '',
  gateway: '',
  server: '',
  active: false,
};

export type GetChPropsParams = {
  tuneId: string;
  host: string;
  connection: Connection;
  liveCnt: number;
  chConfig: ChConfig | null;
};

export type GetConnectionsOptions = {
  isSelfExclude?: boolean;
  isSortUpperLayer?: boolean;
};

export const getConnectionsOptions = {
  isSelfExclude: false,
  isSortUpperLayer: true,
};

export type ParentConnection = string | undefined;
export type TuneConnection = string;
export type ChildConnection = string;
export type Connection = string;

export default class ChModel {
  static separetor = '/';
  static rootConnection = ChModel.separetor;
  static connectionSeparator = '/';
  static defaultProtocol = 'talkn::';
  static defultType = 'text/html';
  static plainType = 'plain';
  constructor(params: Partial<Ch> = init) {
    return Object.assign(this, params);
  }
  static getParentConnection(fixConnection: string): ParentConnection {
    if (fixConnection === ChModel.rootConnection) return undefined;
    let replacedConnection = fixConnection.replace(/.$/, '');
    const lastSlashIndex = replacedConnection.lastIndexOf('/');
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
    const con = pathname.replace('/socket.io', ''); // TODO: コネクション取得ルールが不安定
    const connection = decodeURIComponent(con);
    return connection;
  }

  static getFavicon(host: string) {
    return host.endsWith(ChModel.rootConnection) ? `${host}favicon.ico` : `${host}${ChModel.rootConnection}favicon.ico`;
  }
  static getConnections(connection: Connection, options: GetConnectionsOptions = getConnectionsOptions) {
    const { isSelfExclude, isSortUpperLayer } = options;
    let connections = [ChModel.rootConnection];
    if (connection && connection !== ChModel.rootConnection) {
      const connectionArr = connection.split(ChModel.connectionSeparator).filter((part) => part !== '');
      let connectionPart = '';

      connectionArr.forEach((segment) => {
        connectionPart += `${this.separetor}${segment}`;
        const addConnection = `${connectionPart}${this.separetor}`;
        if (!(isSelfExclude && addConnection === connection)) {
          connections.push(addConnection);
        }
      });
    }

    if (isSortUpperLayer) {
      connections.sort((a, b) => a.length - b.length);
    } else {
      connections.sort((a, b) => b.length - a.length);
    }

    return connections;
  }

  static getMyConnectionClass(connections: Connection[], startConnection: Connection, endConnection?: Connection): Connection[] {
    const myConnectionClass: Connection[] = [];

    const loopConnections = connections.slice().sort((a, b) => a.length - b.length);
    endConnection = endConnection ? endConnection : loopConnections[loopConnections.length - 1];

    let isPush = false;
    for (const i in loopConnections) {
      if (connections[i] === startConnection) {
        isPush = true;
      }
      if (connections[i] === endConnection) break;
      if (isPush) {
        myConnectionClass.push(connections[i]);
      }
    }
    return myConnectionClass;
  }

  static getType(host: string) {
    return host.startsWith(Sequence.HTTPS_PROTOCOL) || host.startsWith(Sequence.HTTP_PROTOCOL) ? ChModel.defultType : ChModel.plainType;
  }

  static getGateway(chConfig: ChConfig | null) {
    return chConfig && chConfig.gateway?.host && chConfig.gateway.port
      ? `${chConfig.gateway.host}:${chConfig.gateway.port}`
      : `127.0.0.1:${define.PORTS.IO_ROOT}`;
  }

  static getServer(chConfig: ChConfig | null) {
    return chConfig && chConfig.nginx.host && chConfig.nginx.port
      ? `${chConfig.nginx.host}:${chConfig.nginx.port}`
      : `127.0.0.1:${define.PORTS.IO_ROOT}`;
  }

  static getChParams = (params: GetChPropsParams): Partial<Ch> => {
    const { tuneId, connection: _connection, host, liveCnt, chConfig } = params;
    const connection = ChModel.getConnection(_connection);
    const connections = ChModel.getConnections(connection);
    const favicon = ChModel.getFavicon(host);
    const type = ChModel.getType(host);
    const gateway = ChModel.getGateway(chConfig);
    const server = ChModel.getServer(chConfig);
    return {
      tuneId,
      connection,
      connections,
      favicon,
      type,
      liveCnt,
      gateway,
      server,
    };
  };
}
