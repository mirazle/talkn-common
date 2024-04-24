import ChModel from "./Ch";

export const typeSingle = "Single";
export const typeMulti = "Multi";
export const typeChild = "Child";
export const typeTimeline = "Timeline";
export const typeTimelineStock = "TimelineStock";
export type PostType =
  | typeof typeSingle
  | typeof typeMulti
  | typeof typeChild
  | typeof typeTimeline
  | typeof typeTimelineStock;

export type Post = {
  id: string;
  title: string;
  connection: string;
  content: string;
  currentTime: string;
  stampId: string;
  favicon: string;
  type: PostType;
  updateTime: string;
};

export default class PostModel {
  constructor(params: Partial<Post> = init) {
    return Object.assign(this, params);
  }
}

export const init: Post = {
  id: "",
  title: "",
  connection: "",
  content: "",
  currentTime: "",
  stampId: "",
  favicon: "", // TODO url
  type: typeSingle,
  updateTime: "",
};
