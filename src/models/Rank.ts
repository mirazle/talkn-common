import PostModel, { Post, init as postInit } from './Post';

export type Rank = Post & {
  liveCnt: number;
};

export default class RankModel {
  liveCnt: number = 0;
  constructor(props: Partial<Rank> = {}) {
    const post = new PostModel(props);
    return Object.assign(this, props, post);
  }
}

export const init = { ...postInit, liveCnt: 0 };
