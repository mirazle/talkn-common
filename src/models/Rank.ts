import PostModel, { Post, init as postInit } from './Post';

export type Rank = Post & {
  liveCnt: number;
};

export type LightRank = {
  connection: string;
  liveCnt: number;
};

export type RangeWithScore = {
  score: number;
  value: string;
};

export class LightRankModel {
  constructor(params: Partial<RangeWithScore> = {}) {
    return Object.assign(this, { connection: params.value, liveCnt: params.score });
  }
}

export default class RankModel {
  static getLightRank(rangeWithScores: RangeWithScore[]): LightRank[] {
    return rangeWithScores.map((liveRank) => {
      return { connection: liveRank.value, liveCnt: liveRank.score } as LightRank;
    });
  }
  constructor(params: Partial<Rank> = {}) {
    const post = new PostModel(params);
    return Object.assign(this, params, post);
  }
}

export const init = { ...postInit, liveCnt: 0 };
