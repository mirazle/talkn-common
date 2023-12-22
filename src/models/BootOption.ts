export type BootOption = {
  id: string;
  env: string;
  type: string;
  connection: string;
  hasSlash: boolean;
  protocol: string;
  host: string;
  extensionMode: string;
  isRankDetailMode: boolean;
  isFullscreen: boolean;
};

export const init: BootOption = {
  id: '',
  env: '',
  type: '',
  connection: '',
  hasSlash: false,
  protocol: '',
  host: '',
  extensionMode: '',
  isRankDetailMode: false,
  isFullscreen: false,
};

export default class BootOptionModel {
  constructor(params: Partial<BootOption> = init) {
    return Object.assign(this, params);
  }
}
