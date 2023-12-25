export type BootOption = {
  hasSlash: boolean;
  protocol: string;
  host: string;
};

export const init: BootOption = {
  hasSlash: false,
  protocol: '',
  host: '',
};

export default class BootOptionModel {
  constructor(params: Partial<BootOption> = init) {
    return Object.assign(this, params);
  }
}
