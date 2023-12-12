import Emotions from '../';

export default class Russell {
  static get TYPES() {
    return [
      Emotions.TYPES.SUPRISE,
      Emotions.TYPES.EXCITE,
      Emotions.TYPES.HAPPY,
      Emotions.TYPES.JOY,
      Emotions.TYPES.GLAD,
      Emotions.TYPES.SATISFACTION,
      Emotions.TYPES.COMFORT,
      Emotions.TYPES.RELAX,
      Emotions.TYPES.TIRED,
      Emotions.TYPES.SLEEPY,
      Emotions.TYPES.SLACK,
      Emotions.TYPES.BORING,
      Emotions.TYPES.MELANCHOLY,
      Emotions.TYPES.SAD,
      Emotions.TYPES.UNPLEASANT,
      Emotions.TYPES.FRUSTRATED,
      Emotions.TYPES.DISSATISFIED,
      Emotions.TYPES.ANGER,
      Emotions.TYPES.WORRY,
      Emotions.TYPES.FEAR,
    ];
  }

  typesArray: any;
  constructor() {
    this.typesArray = [];

    Russell.TYPES.forEach((emotionType) => {
      this.typesArray.push(emotionType.LABEL);
    });
    /*
    Object.keys(Russell.TYPES).forEach((index) => {
      this.typesArray.push(Russell.TYPES[index].LABEL);
    });
    */
  }

  static getSaveBalance(stampId: number) {
    const balance: {[key: number]: any} = {
      // Suprise(Posi1)
      1001: [{ [Emotions.TYPES.SUPRISE.ID]: 1 }],
      1002: [{ [Emotions.TYPES.SUPRISE.ID]: 1 }],

      // Excite(Posi1)
      1101: [{ [Emotions.TYPES.EXCITE.ID]: 1 }],
      1102: [{ [Emotions.TYPES.EXCITE.ID]: 1 }],
      1103: [{ [Emotions.TYPES.EXCITE.ID]: 1 }],

      // Happy(Posi2)
      1201: [{ [Emotions.TYPES.HAPPY.ID]: 1 }],
      1202: [{ [Emotions.TYPES.HAPPY.ID]: 1 }],
      1203: [{ [Emotions.TYPES.HAPPY.ID]: 1 }],
      1204: [{ [Emotions.TYPES.HAPPY.ID]: 1 }],

      // Joy(Posi2)
      1301: [{ [Emotions.TYPES.JOY.ID]: 1 }],
      1302: [{ [Emotions.TYPES.JOY.ID]: 1 }],
      1303: [{ [Emotions.TYPES.JOY.ID]: 1 }],
      1304: [{ [Emotions.TYPES.JOY.ID]: 1 }],
      1305: [{ [Emotions.TYPES.JOY.ID]: 1 }],
      1306: [{ [Emotions.TYPES.JOY.ID]: 1 }],
      1307: [{ [Emotions.TYPES.JOY.ID]: 1 }],

      // Glad(Posi3)
      1401: [{ [Emotions.TYPES.GLAD.ID]: 1 }],
      1402: [{ [Emotions.TYPES.GLAD.ID]: 1 }],

      // Satisfaction(Posi3)
      1501: [{ [Emotions.TYPES.SATISFACTION.ID]: 1 }],
      1502: [{ [Emotions.TYPES.SATISFACTION.ID]: 1 }],
      1503: [{ [Emotions.TYPES.SATISFACTION.ID]: 1 }],
      1504: [{ [Emotions.TYPES.SATISFACTION.ID]: 1 }],

      // Comfort(Posi4)
      1601: [{ [Emotions.TYPES.COMFORT.ID]: 1 }],
      1602: [{ [Emotions.TYPES.COMFORT.ID]: 1 }],

      // Relax(Posi4)
      1701: [{ [Emotions.TYPES.RELAX.ID]: 1 }],
      1702: [{ [Emotions.TYPES.RELAX.ID]: 1 }],
      1703: [{ [Emotions.TYPES.RELAX.ID]: 1 }],

      // Tired(Posi4)
      1801: [{ [Emotions.TYPES.TIRED.ID]: 1 }],
      1802: [{ [Emotions.TYPES.TIRED.ID]: 1 }],
      1803: [{ [Emotions.TYPES.TIRED.ID]: 1 }],

      // Slack(Nega4)
      2001: [{ [Emotions.TYPES.SLACK.ID]: 1 }],
      2002: [{ [Emotions.TYPES.SLACK.ID]: 1 }],
      2003: [{ [Emotions.TYPES.SLACK.ID]: 1 }],
      2004: [{ [Emotions.TYPES.SLACK.ID]: 1 }],

      // Boring(Nega4)
      2101: [{ [Emotions.TYPES.BORING.ID]: 1 }],
      2102: [{ [Emotions.TYPES.BORING.ID]: 1 }],
      2103: [{ [Emotions.TYPES.BORING.ID]: 1 }],

      // Melancholy(Nega4)
      2201: [{ [Emotions.TYPES.MELANCHOLY.ID]: 1 }],
      2202: [{ [Emotions.TYPES.MELANCHOLY.ID]: 1 }],
      2203: [{ [Emotions.TYPES.MELANCHOLY.ID]: 1 }],
      2204: [{ [Emotions.TYPES.MELANCHOLY.ID]: 1 }],
      2205: [{ [Emotions.TYPES.MELANCHOLY.ID]: 1 }],

      // Sad(Nega3)
      2301: [{ [Emotions.TYPES.SAD.ID]: 1 }],
      2302: [{ [Emotions.TYPES.SAD.ID]: 1 }],
      2303: [{ [Emotions.TYPES.SAD.ID]: 1 }],

      // Unpleasant(Nega3)
      2401: [{ [Emotions.TYPES.UNPLEASANT.ID]: 1 }],
      2402: [{ [Emotions.TYPES.UNPLEASANT.ID]: 1 }],
      2403: [{ [Emotions.TYPES.UNPLEASANT.ID]: 1 }],
      2404: [{ [Emotions.TYPES.UNPLEASANT.ID]: 1 }],

      // frustrated(Nega3)
      2501: [{ [Emotions.TYPES.FRUSTRATED.ID]: 1 }],
      2502: [{ [Emotions.TYPES.FRUSTRATED.ID]: 1 }],
      2503: [{ [Emotions.TYPES.FRUSTRATED.ID]: 1 }],

      // dissatisfied(Nega2)
      2601: [{ [Emotions.TYPES.DISSATISFIED.ID]: 1 }],
      2602: [{ [Emotions.TYPES.DISSATISFIED.ID]: 1 }],

      // Anger(Nega2)
      2701: [{ [Emotions.TYPES.ANGER.ID]: 1 }],
      2702: [{ [Emotions.TYPES.ANGER.ID]: 1 }],
      2703: [{ [Emotions.TYPES.ANGER.ID]: 1 }],
      2704: [{ [Emotions.TYPES.ANGER.ID]: 1 }],
      2705: [{ [Emotions.TYPES.ANGER.ID]: 1 }],
      2706: [{ [Emotions.TYPES.ANGER.ID]: 1 }],

      // Worry(Nega1)
      2801: [{ [Emotions.TYPES.WORRY.ID]: 1 }],
      2802: [{ [Emotions.TYPES.WORRY.ID]: 1 }],
      2803: [{ [Emotions.TYPES.WORRY.ID]: 1 }],
      2804: [{ [Emotions.TYPES.WORRY.ID]: 1 }],
      2805: [{ [Emotions.TYPES.WORRY.ID]: 1 }],
      2806: [{ [Emotions.TYPES.WORRY.ID]: 1 }],
      2807: [{ [Emotions.TYPES.WORRY.ID]: 1 }],

      // Fear(Nega1)
      2901: [{ [Emotions.TYPES.FEAR.ID]: 1 }],
      2902: [{ [Emotions.TYPES.FEAR.ID]: 1 }],
      2903: [{ [Emotions.TYPES.FEAR.ID]: 1 }],
      2904: [{ [Emotions.TYPES.FEAR.ID]: 1 }],
      2905: [{ [Emotions.TYPES.FEAR.ID]: 1 }],
      2906: [{ [Emotions.TYPES.FEAR.ID]: 1 }],
    };

    return balance[stampId] ? balance[stampId] : null;
  }

  static getSchemas() {
    let schemas: { [key: string]: any} = {};
    Russell.TYPES.forEach((obj, i) => {
      schemas[obj.LABEL] = { type: Number, default: 0, min: 0 };
    });
    return schemas;
  }
}
