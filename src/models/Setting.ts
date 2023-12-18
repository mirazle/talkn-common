export type Setting = {
  chShowPostCnt: number;
};

export default class SettingModel {
  constructor(params: Partial<Setting> = init) {
    return Object.assign(this, params);
  }
}

export const init: Setting = {
  chShowPostCnt: 20,
};
