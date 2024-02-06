import define from '@common/define';

export type Contract = {
  nginx: {
    location: string;
    proxyWssServer: string;
    proxyWssPort: number;
  };
  redis: {
    port: number;
  };
};

export const init: Contract = {
  nginx: {
    location: '',
    proxyWssServer: '127.0.0.1',
    proxyWssPort: 0,
  },
  redis: {
    port: 0,
  },
};

export default class ContractModel {
  constructor(params: Partial<Contract> = init) {
    return Object.assign(this, params);
  }
}
