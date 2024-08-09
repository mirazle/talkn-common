import ChModel, { Connection } from './Ch';

export type CommunicationOption = {
  host: string;
  port: number;
};

export type Redis = {
  cluster: CommunicationOption[];
  client: CommunicationOption;
};

export type ChConfigJson = {
  gateway: CommunicationOption | null;
  nginx: {
    location: string;
    host: string;
    port: number;
  };
  redis: Redis;
  accept: {
    rankAll: boolean;
  };
  children: ChConfigJson[];
};

export type ChConfig = Exclude<ChConfigJson, 'children'> & {
  connection: Connection;
};

type GetMyConfigParams = {
  chConfigJson: ChConfigJson;
  topConnection: Connection;
};

type GetMyRootsParams = {
  chConfigJson: ChConfigJson;
  tuneConnection: Connection;
};

export const init: ChConfigJson = {
  gateway: null,
  nginx: {
    location: '',
    host: 'localhost',
    port: 0,
  },
  redis: {
    cluster: [],
    client: {
      host: '127.0.0.1',
      port: 6379,
    },
  },
  accept: {
    rankAll: false,
  },
  children: [],
};

export default class ChConfigModel {
  constructor(params: Partial<ChConfig> = init) {
    return Object.assign(this, params);
  }

  static getMyChConfig(chConfigJson: ChConfigJson, myConnection: Connection): ChConfig {
    const matching = (chConfig: ChConfigJson, parentLocation: Connection = ''): ChConfigJson | null => {
      const currentLocation = parentLocation + chConfig.nginx.location;

      if (currentLocation === myConnection) {
        return {
          ...chConfig,
          children: [],
          connection: myConnection,
        } as ChConfig;
      }

      if (chConfig.children && chConfig.children.length > 0) {
        for (const child of chConfig.children) {
          const result = matching(child, currentLocation);
          if (result) return result;
        }
      }

      return null;
    };
    const matched = matching(chConfigJson) as ChConfig;

    return matched !== null ? matched : { ...chConfigJson, children: [], connection: myConnection };
  }

  static getChRootsConfig(params: GetMyRootsParams): ChConfig[] {
    const { chConfigJson, tuneConnection } = params;
    const reccurentFind = (
      children: ChConfigJson[],
      tuneConnection: Connection,
      parentConnection: string,
      roots: ChConfig[] = []
    ): ChConfig[] => {
      const finded = children.find((child) => tuneConnection.indexOf(parentConnection + child.nginx.location) >= 0);

      if (finded) {
        const currentConnection = parentConnection + finded.nginx.location;
        roots.push({ ...finded, children: [], connection: currentConnection });
        return reccurentFind(finded.children, tuneConnection, currentConnection, roots);
      } else {
        return roots;
      }
    };

    const configs = reccurentFind(chConfigJson.children, tuneConnection, ChModel.rootConnection, [
      { ...chConfigJson, children: [], connection: ChModel.rootConnection },
    ]);
    return configs;
  }

  static getGateway(params: GetMyRootsParams): CommunicationOption {
    const chRootsConfig = ChConfigModel.getChRootsConfig(params);
    const gateway = chRootsConfig[1] ? chRootsConfig[1].gateway : chRootsConfig[0].gateway;
    return gateway as CommunicationOption;
  }

  static getRootsConnections(params: GetMyRootsParams, isExcludeTuneConnection = false): Connection[] {
    const myRootsConfig = ChConfigModel.getChRootsConfig(params);
    const myRootsConnections = myRootsConfig.map((config) => config.connection);
    return isExcludeTuneConnection ? myRootsConnections.filter((c) => c !== params.tuneConnection) : myRootsConnections;
  }
}
