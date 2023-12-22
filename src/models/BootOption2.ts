import Sequence from '@common/Sequence';
import conf from '@common/conf';
import define from '@common/define';
import { generateQniqueKey, isNodeServer } from '@common/utils';
import models from '.';

export type ExtensionModeType =
  | typeof BootOptionModel.extensionModeModal
  | typeof BootOptionModel.extensionModeBottom
  | typeof BootOptionModel.extensionModeOutWindow
  | typeof BootOptionModel.extensionModeLiveMedia;

export type EnvType = typeof define.DEVELOPMENT | typeof define.LOCALHOST | typeof define.PRODUCTION;
export type BootType = typeof define.APP_TYPES.API | typeof define.APP_TYPES.CLIENT | typeof define.APP_TYPES.EXTENSION;
export type BootProtocolType = typeof Sequence.HTTPS_PROTOCOL | typeof Sequence.HTTP_PROTOCOL | typeof Sequence.TALKN_PROTOCOL;

export type BootOption2 = {
  id: string;
  env: EnvType;
  type: BootType;
  connection: string;
  hasSlash: boolean;
  protocol: BootProtocolType;
  host: string;
  extensionMode: ExtensionModeType;
  isRankDetailMode: boolean;
  isFullscreen: boolean;
};

export default class BootOptionModel {
  id: string;
  env: EnvType = define.PRODUCTION;
  type: BootType = define.APP_TYPES.PORTAL;
  connection: string = models.Ch.rootConnection;
  hasSlash: boolean = true;
  protocol: BootProtocolType = Sequence.HTTPS_PROTOCOL;
  host: string = '127.0.0.1';
  extensionMode: ExtensionModeType = BootOptionModel.extensionModeNone;
  isRankDetailMode: boolean = false;
  isFullscreen: boolean = false;
  constructor(params: Partial<BootOption2> = init2) {
    const initialRootCh = BootOptionModel.getInitialRootCh(conf.env);
    const firstHasSlash = BootOptionModel.getFirstHasSlach(initialRootCh);
    this.env = conf.env;
    this.id = params.id || generateQniqueKey();
    this.type = params.type || define.APP_TYPES.PORTAL;
    this.hasSlash = params.hasSlash || BootOptionModel.getLastHasSlach(initialRootCh);
    this.connection = params.connection || BootOptionModel.getActiveConnection(initialRootCh, firstHasSlash, this.hasSlash);
    this.protocol = params.protocol || BootOptionModel.getProtocol();
    this.isFullscreen = params.isFullscreen || false;
    this.host = params.host || '127.0.0.1';
    this.extensionMode = params.extensionMode || BootOptionModel.extensionModeNone;
    this.isRankDetailMode = Boolean(params.isRankDetailMode || false);
  }
  static get extensionModeModal() {
    return 'Modal';
  }
  static get extensionModeBottom() {
    return 'Bottom';
  }
  static get extensionModeEmbed() {
    return 'Embed';
  }
  static get extensionModeLiveMedia() {
    return 'LiveMedia';
  }
  static get extensionModeOutWindow() {
    return 'OutWindow';
  }
  static get extensionModeNone() {
    return 'None';
  }
  static getInitialRootCh(env: EnvType): string {
    let initialRootCh: string = '/';
    initialRootCh = initialRootCh.replace(`${Sequence.HTTPS_PROTOCOL}/`, '').replace(`${Sequence.HTTP_PROTOCOL}/`, '');
    switch (env) {
      case define.PRODUCTION:
        if (initialRootCh.indexOf(conf.coverURL) >= 0) {
          initialRootCh = initialRootCh.replace(`/${conf.coverURL}/`, '/');
        } else {
          initialRootCh = initialRootCh.replace(`/${define.PRODUCTION_DOMAIN}`, '/');
        }
        break;
      case define.LOCALHOST:
        if (initialRootCh.indexOf(conf.coverURL) >= 0) {
          initialRootCh = initialRootCh.replace(`/${conf.coverURL}/`, '/');
        } else {
          initialRootCh = initialRootCh.replace(`/${define.DEVELOPMENT_DOMAIN}`, '/');
        }

        break;
      case define.DEVELOPMENT:
        initialRootCh = initialRootCh
          .replace(`:${define.PORTS.DEVELOPMENT_CLIENT}`, '')
          .replace(`:${define.PORTS.DEVELOPMENT_API}`, '')
          .replace(`:${define.PORTS.DEVELOPMENT_COVER}`, '')
          .replace(`:${define.PORTS.DEVELOPMENT_TUNE}`, '')
          .replace(`:${define.PORTS.DEVELOPMENT_COMPONENTS}`, '');
        if (initialRootCh.indexOf(`/${define.DEVELOPMENT_DOMAIN}/`) === 0) {
          initialRootCh = initialRootCh.replace(`/${define.DEVELOPMENT_DOMAIN}`, '');
        }
        break;
    }

    return initialRootCh;
  }

  static getType(extScript: boolean, clientScript: boolean): BootType {
    let type = define.APP_TYPES.API;
    if (extScript) return define.APP_TYPES.EXTENSION;
    if (clientScript) return define.APP_TYPES.CLIENT;
    if (clientScript) return define.APP_TYPES.COMPONENTS;
    return type;
  }

  static getProtocol(): BootProtocolType {
    if (location.protocol === Sequence.HTTPS_PROTOCOL) return Sequence.HTTPS_PROTOCOL;
    if (location.protocol === Sequence.HTTP_PROTOCOL) return Sequence.HTTP_PROTOCOL;
    return Sequence.TALKN_PROTOCOL;
  }

  static getHost(params?: BootOption2) {
    if (isNodeServer()) {
      return (params && params.host) || '127.0.0.1';
    } else {
      return window.location.host;
    }
  }

  static getFirstHasSlach(ch: string): boolean {
    return ch.startsWith('/');
  }

  static getLastHasSlach(ch: string): boolean {
    return ch.endsWith('/');
  }

  static getActiveConnection(initialRootCh: string, firstHasSlash: boolean, lastHasSlash: boolean): string {
    let ch = initialRootCh;
    ch = firstHasSlash ? ch : `/${ch}`;
    ch = lastHasSlash ? ch : `${ch}/`;
    ch = ch.replace(/^\/\//, '/');
    return ch;
  }

  static getCh(_ch?: string): string {
    if (!_ch || _ch === '') return '/';
    _ch = _ch.replace(`${Sequence.HTTPS_PROTOCOL}/`, '').replace(`${Sequence.HTTP_PROTOCOL}/`, '');
    _ch = _ch.endsWith('/') ? _ch : _ch + '/';
    _ch = _ch.startsWith('/') ? _ch : '/' + _ch;
    return _ch;
  }
}

export const init2: BootOption2 = {
  id: '',
  env: '',
  type: '',
  connection: '',
  hasSlash: false,
  protocol: '',
  host: '',
  extensionMode: '',
  isRankDetailMode: false,
  isFullscreen: false,
};
