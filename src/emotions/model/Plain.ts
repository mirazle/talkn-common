import Emotions from '../';

export default class Plain {
  static get TYPES() {
    return [Emotions.TYPES.LIKE];
  }

  static getSaveBalance(stampId: number) {
    const balance: {[key: number]: any} = {
      1: [{ [Emotions.TYPES.LIKE.ID]: 1 }],
    };
    return balance[stampId] ? balance[stampId] : null;
  }

  static getSchemas() {
    let schemas: { [key: string]: any} = {};
    Plain.TYPES.forEach((obj, i) => {
      schemas[obj.LABEL] = { type: Number, default: 0, min: 0 };
    });
    return schemas;
  }
}
