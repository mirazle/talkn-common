import Sequence from './Sequence';

export default class PostMessage {
  // HANDLE CLIENT AND WSAPI
  static get HANDLE_CLIENT_AND_WSAPI() {
    return 'HANDLE_CLIENT_AND_WSAPI';
  }
  static get WSAPI_TO_CLIENT_TYPE() {
    return 'WSAPI_TO_CLIENT_TYPE';
  }
  static get CLIENT_TO_WSAPI_TYPE() {
    return 'CLIENT_TO_WSAPI_TYPE';
  }

  // HANDLE_API_AND_CLIENT
  static get HANDLE_API_AND_CLIENT() {
    return 'HANDLE_API_AND_CLIENT';
  }
  static get API_TO_CLIENT_TYPE() {
    return 'API_TO_CLIENT_TYPE';
  }
  static get CLIENT_TO_API_TYPE() {
    return 'CLIENT_TO_API_TYPE';
  }

  // HANDLE_API_AND_EXT
  static get HANDLE_EXT_AND_API() {
    return 'HANDLE_EXT_AND_API';
  }
  static get MEDIA_TO_CLIENT_TYPE() {
    return 'MEDIA_TO_CLIENT_TYPE';
  }
  static get EXT_TO_API_TYPE() {
    return 'EXT_TO_API_TYPE';
  }

  // HANDLE_CLIENT_AND_EXT
  static get HANDLE_EXT_AND_CLIENT() {
    return 'handleExtAndClient';
  }
  static get CLIENT_TO_EXT_TYPE() {
    return 'CLIENT_TO_EXT_TYPE';
  }
  static get EXT_TO_CLIENT_TYPE() {
    return 'EXT_TO_CLIENT_TYPE';
  }
  static get HANDLE_MEDIA_SERVER_AND_MEDIA_CLIENT() {
    return 'handleMediaServerAndMediaClient';
  }
  static get MEDIA_SERVER_TO_MEDIA_CLIENT_TYPE() {
    return 'MEDIA_SERVER_TO_MEDIA_CLIENT_TYPE';
  }
  static get MEDIA_CLIENT_TO_MEDIA_SERVER_TYPE() {
    return 'MEDIA_CLIENT_TO_MEDIA_SERVER_TYPE';
  }
  static convertApiToClientActionType(actionType: string) {
    if (actionType.indexOf(Sequence.API_TO_SERVER_REQUEST) === 0) {
      return actionType.replace(Sequence.API_TO_SERVER_REQUEST, Sequence.API_TO_CLIENT_REQUEST);
    }
    if (actionType.indexOf(Sequence.SERVER_TO_API_EMIT) === 0) {
      return actionType.replace(Sequence.SERVER_TO_API_EMIT, Sequence.API_TO_CLIENT_EMIT);
    }
    if (actionType.indexOf(Sequence.SERVER_TO_API_BROADCAST) === 0) {
      return actionType.replace(Sequence.SERVER_TO_API_BROADCAST, Sequence.API_TO_CLIENT_BROADCAST);
    }
    return `API_TO_CLIENT[ACTION]:${actionType}`;
  }
  static getMessageTypes(actionType: string): {ioType: string; exeMethod: string} {
    const splited1 = actionType.split(':');
    const splited2 = splited1[0] && splited1[0] ? splited1[0] && splited1[0].split('[') : [];
    const ioType = splited2[1] && splited2[1] ? splited2[1] && splited2[1].replace(']', '') : 'UNKNOWN';
    const exeMethod = splited1[1];
    return { ioType, exeMethod };
  }
  static convertExtToClientActionType(actionType: string) {
    return `EXT_TO_CLIENT[ACTION]:${actionType}`;
  }
}

// common.
export const HandleMessageMethod = 'handle';
export const HandleRequestMethod = 'handle';
export type IoTypeValues =
  | typeof Sequence.API_SETUP
  | typeof Sequence.API_REQUEST_TYPE
  | typeof Sequence.API_RESPONSE_TYPE_EMIT
  | typeof Sequence.API_RESPONSE_TYPE_BROADCAST
  | typeof Sequence.UNKNOWN;
export type IoType = {
  ioType: IoType;
};
export type MessageParamsFree = { key: string; value: any } | {};
export type MessageParams = { key: string; value: any } | {};

export type MessageClientAndWsApiType = {
  id: string;
  type: typeof PostMessage.WSAPI_TO_CLIENT_TYPE | typeof PostMessage.CLIENT_TO_WSAPI_TYPE;
  ioType: IoTypeValues;
  method: string;
  params?: MessageParams;
  methodBack?: string;
};

export type MessageClientAndExtType = {
  id: string;
  type: typeof PostMessage.EXT_TO_CLIENT_TYPE | typeof PostMessage.CLIENT_TO_EXT_TYPE;
  ioType: IoTypeValues;
  method: string;
  href: string;
  params?: MessageParams;
  methodBack?: string;
};

export type MessageMediaClientAndMediaServerType = {
  id: string;
  type: typeof PostMessage.MEDIA_CLIENT_TO_MEDIA_SERVER_TYPE | typeof PostMessage.MEDIA_SERVER_TO_MEDIA_CLIENT_TYPE;
  method: string;
  params?: MessageParams;
  methodBack?: string;
};
