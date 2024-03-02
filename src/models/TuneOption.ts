export const tuneOptionPosts = 'posts';
export const tuneOptionRank = 'rank';
export const tuneOptionRankAll = 'rankAll';
export const tuneOptionRankHasPost = 'rankHasPost';
export const tuneOptionDetailEmotion = 'detailEmotion';

export type TuneOption = {
  [tuneOptionPosts]?: number;
  [tuneOptionRank]?: boolean | 0 | 1;
  [tuneOptionRankAll]?: boolean | 0 | 1;
  [tuneOptionRankHasPost]?: boolean | 0 | 1;
  [tuneOptionDetailEmotion]?: boolean | 0 | 1;
};

export const init: TuneOption = {
  [tuneOptionPosts]: 0,
  [tuneOptionRank]: 0,
  [tuneOptionRankAll]: 0,
  [tuneOptionRankHasPost]: 0,
  [tuneOptionDetailEmotion]: 0,
};

export const liveMethodList = Object.keys(init);

export default class TuneOptionModel {
  constructor(params: Partial<TuneOption> = init) {
    return Object.assign(this, params);
  }
}
