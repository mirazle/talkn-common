import PostModel, { Post, init as postInit } from "./Post";

export type Rank = Post & {
  liveCnt: number;
};

export default class RankModel {
  liveCnt: number = 0;
  constructor(params: Partial<Rank> = {}) {
    const post = new PostModel(params);
    return Object.assign(this, params, post);
  }
}

export const init = { ...postInit, liveCnt: 0 };
