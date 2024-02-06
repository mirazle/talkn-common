import BootOption, { BootOption as BootOptionType, init as bootOptionInit } from './BootOption';
import Ch, { Ch as ChType, init as chInit } from './Ch';
import ChDetail, { ChDetail as ChDetailType, init as chDetailInit } from './ChDetail';
import Post, { Post as PostType, init as postInit } from './Post';
import Rank, { Rank as RankType, init as rankInit } from './Rank';
import Contract, { Contract as ContractType, init as contractInit } from './Contract';

export type Types = {
  BootOption: BootOptionType;
  Ch: ChType;
  ChDetail: ChDetailType;
  Post: PostType;
  Rank: RankType;
  Contract: ContractType;
};

export const inits = {
  bootOption: bootOptionInit,
  ch: chInit,
  chDetail: chDetailInit,
  post: postInit,
  rank: rankInit,
  contract: contractInit,
};

export default {
  BootOption,
  Ch,
  ChDetail,
  Rank,
  Post,
  Contract,
};
