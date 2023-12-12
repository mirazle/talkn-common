import Sequence from './Sequence';
import conf from './conf';
import define from './define';

export type ExtensionModeType =
  | typeof BootOption.extensionModeModal
  | typeof BootOption.extensionModeBottom
  | typeof BootOption.extensionModeOutWindow
  | typeof BootOption.extensionModeLiveMedia;

export type EnvType = typeof define.DEVELOPMENT | typeof define.LOCALHOST | typeof define.PRODUCTION;
export type BootType = typeof define.APP_TYPES.API | typeof define.APP_TYPES.CLIENT | typeof define.APP_TYPES.EXTENSION;
export type BootProtocolType = typeof Sequence.HTTPS_PROTOCOL | typeof Sequence.HTTP_PROTOCOL | typeof Sequence.TALKN_PROTOCOL;
export type BootOptionParamsType = {
  ch: string;
  hasSlash?: boolean;
  protocol?: BootProtocolType;
  host?: string;
  mode?: ExtensionModeType;
  isRankDetailMode?: boolean;
  isFullscreen?: boolean;
};
export type BootOptionType = {
  id: string;
  params?: BootOptionParamsType;
};

export default class BootOption {
  env: EnvType = define.PRODUCTION;
  type: BootType = define.APP_TYPES.PORTAL;
  id: string;
  ch: string = '/';
  hasSlash: boolean = true;
  protocol: BootProtocolType = Sequence.HTTPS_PROTOCOL;
  host: string = '127.0.0.1';
  extensionMode: ExtensionModeType = BootOption.extensionModeNone;
  isRankDetailMode: boolean = false;
  isFullscreen: boolean = false;
  defaultProps: BootOptionType = {
    id: '',
    params: {
      ch: '/',
      hasSlash: true,
      protocol: Sequence.HTTPS_PROTOCOL,
      host: '127.0.0.1',
      mode: BootOption.extensionModeNone,
      isRankDetailMode: false,
    },
  };
  constructor(id: string, type: string, params?: BootOptionParamsType) {
    const initialRootCh = BootOption.getInitialRootCh(conf.env);
    const firstHasSlash = BootOption.getFirstHasSlach(initialRootCh);
    this.env = conf.env;
    this.id = id;
    this.type = type;
    this.hasSlash = params && params.hasSlash !== undefined ? params.hasSlash : BootOption.getLastHasSlach(initialRootCh);
    this.ch = params && params.ch ? params.ch : BootOption.getActiveCh(initialRootCh, firstHasSlash, this.hasSlash);
    this.protocol = params && params.protocol ? params.protocol : BootOption.getProtocol();
    this.isFullscreen = params && params.isFullscreen ? params.isFullscreen : false;
    this.host = params && params.host ? params.host : '127.0.0.1';
    this.extensionMode = params && params.mode ? params.mode : BootOption.extensionModeNone;

    const _isRankDetailMode = this.defaultProps.params && this.defaultProps.params.isRankDetailMode;
    this.isRankDetailMode = Boolean(params && params.isRankDetailMode !== undefined ? params.isRankDetailMode : _isRankDetailMode);
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

  static getFirstHasSlach(ch: string): boolean {
    return ch.startsWith('/');
  }

  static getLastHasSlach(ch: string): boolean {
    return ch.endsWith('/');
  }

  static getActiveCh(initialRootCh: string, firstHasSlash: boolean, lastHasSlash: boolean): string {
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
