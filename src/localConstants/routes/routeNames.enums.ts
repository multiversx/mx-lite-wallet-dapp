export enum HooksEnum {
  login = 'login',
  logout = 'logout',
  sign = 'sign',
  signMessage = 'sign-message'
}

export enum RouteNamesEnum {
  home = '/',
  dashboard = '/dashboard',
  unlock = '/unlock',
  disclaimer = '/disclaimer',
  send = '/send',
  logout = '/logout',
  sign = '/sign',
  signMessage = '/sign-message'
}

export enum HooksPageEnum {
  sign = `/hook/${HooksEnum.sign}`,
  login = `/hook/${HooksEnum.login}`,
  logout = `/hook/${HooksEnum.logout}`,
  signMessage = `/hook/${HooksEnum.signMessage}`
}

export enum CreateRoutesEnum {
  info = '/create',
  mnemonicPhrase = '/create/mnemonic',
  checkMnemonic = '/create/check',
  setPassword = '/create/password',
  download = '/create/download'
}

export enum RecoverRoutesEnum {
  mnemonicPhrase = '/recover',
  setPassword = '/recover/password',
  download = '/recover/download'
}
