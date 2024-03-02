import ChModel from './Ch';
import { TuneOption } from './TuneOption';

export type BootOption = {
  hasSlash: boolean;
  protocol: string;
  host: string;
  connection: string;
  tuneOption: TuneOption;
};

export const init: BootOption = {
  hasSlash: false,
  protocol: '',
  host: '',
  connection: '',
  tuneOption: {},
};

export default class BootOptionModel {
  static getConnection(connection: string) {
    if (connection === '') return ChModel.rootConnection;
    connection = connection.endsWith(ChModel.rootConnection) ? connection : `${connection}${ChModel.rootConnection}`;
    return connection.startsWith(ChModel.rootConnection) ? connection : `${ChModel.rootConnection}${connection}`;
  }
  static getTuneOptionString(tuneOption: TuneOption): string {
    let tuneOptionNumbers: { [key in keyof TuneOption]: number } = {};
    Object.keys(tuneOption).forEach((key) => {
      const tuneOptionKey = key as keyof TuneOption;
      const value = Number(tuneOption[tuneOptionKey]);
      if (value) {
        tuneOptionNumbers[tuneOptionKey] = Number(tuneOption[tuneOptionKey]);
      }
    });
    const parsedTuneOption = JSON.parse(JSON.stringify(tuneOptionNumbers));
    return new URLSearchParams(parsedTuneOption).toString();
  }
  constructor(params: Partial<BootOption> = init) {
    return Object.assign(this, params);
  }
}
