import BootOption, { BootOption as BootOptionType, init as bootOptionInit } from './BootOption';
import Ch, { Ch as ChType, init as chInit } from './Ch';
import ChDetail, { ChDetail as ChDetailType, init as chDetailInit } from './ChDetail';
import Post, { Post as PostType, init as postInit } from './Post';
import Rank, { Rank as RankType, init as rankInit } from './Rank';
import ChConfig, { ChConfig as ChConfigType, init as chConfigInit } from './ChConfig';

import TuneOption, { TuneOption as TuneOptionType, init as tuneOptionInit } from './TuneOption';

export type Types = {
  BootOption: BootOptionType;
  Ch: ChType;
  ChDetail: ChDetailType;
  Post: PostType;
  Rank: RankType;
  ChTree: ChConfigType;
  TuneOption: TuneOptionType;
};

export const inits = {
  bootOption: bootOptionInit,
  ch: chInit,
  chDetail: chDetailInit,
  post: postInit,
  rank: rankInit,
  chTree: chConfigInit,
  tuneOption: tuneOptionInit,
};

export default {
  BootOption,
  Ch,
  ChDetail,
  Rank,
  Post,
  ChConfig,
  TuneOption,
};
