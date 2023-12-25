export type IoType = {
  ioType: IoType;
};

export type PostMessage = {
  pid: string;
  method: string;
  params?: any;
};

export type OnMessage = PostMessage;
