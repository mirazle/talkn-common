export type BootOption = {
  hasSlash: boolean;
  protocol: string;
  host: string;
  connection: string;
};

export const init: BootOption = {
  hasSlash: false,
  protocol: "",
  host: "",
  connection: "",
};

export default class BootOptionModel {
  constructor(params: Partial<BootOption> = init) {
    return Object.assign(this, params);
  }
}
