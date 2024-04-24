import ChModel, { Connection } from "./Ch";

export type RedisOption = {
  host: string;
  port: number;
};

export type Redis = {
  cluster: RedisOption[];
  client: RedisOption;
};

export type ChConfigJson = {
  nginx: {
    location: string;
    proxyWssServer: string;
    proxyWssPort: number;
  };
  redis: Redis;
  accept: {
    rankAll: boolean;
  };
  children: ChConfigJson[];
};

export type ChConfig = Exclude<ChConfigJson, "children"> & {
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
  nginx: {
    location: "",
    proxyWssServer: "127.0.0.1",
    proxyWssPort: 0,
  },
  redis: {
    cluster: [],
    client: {
      host: "127.0.0.1",
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

  static getMyChConfig(params: GetMyConfigParams): ChConfig {
    const { chConfigJson, topConnection } = params;
    const matching = (
      chConfig: ChConfigJson,
      parentLocation: Connection = ""
    ): ChConfigJson | null => {
      const currentLocation = parentLocation + chConfig.nginx.location;

      if (currentLocation === topConnection) {
        return {
          ...chConfig,
          children: [],
          connection: topConnection,
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

    return matched !== null
      ? matched
      : { ...chConfigJson, children: [], connection: topConnection };
  }

  static getMyChRootsConfig(params: GetMyRootsParams): ChConfig[] {
    const { chConfigJson, tuneConnection } = params;
    const reccurentFind = (
      children: ChConfigJson[],
      tuneConnection: Connection,
      parentConnection: string,
      roots: ChConfig[] = []
    ): ChConfig[] => {
      const finded = children.find(
        (child) =>
          tuneConnection.indexOf(parentConnection + child.nginx.location) >= 0
      );

      if (finded) {
        const currentConnection = parentConnection + finded.nginx.location;
        roots.push({ ...finded, children: [], connection: currentConnection });
        return reccurentFind(
          finded.children,
          tuneConnection,
          currentConnection,
          roots
        );
      } else {
        return roots;
      }
    };

    const configs = reccurentFind(
      chConfigJson.children,
      tuneConnection,
      ChModel.rootConnection,
      [{ ...chConfigJson, children: [], connection: ChModel.rootConnection }]
    );
    return configs;
  }
  static getMyChRootsConnections(params: GetMyRootsParams): Connection[] {
    const myChRootsConfig = ChConfigModel.getMyChRootsConfig(params);
    return myChRootsConfig.map((config) => config.connection);
  }
}
