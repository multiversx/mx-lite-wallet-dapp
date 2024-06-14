export enum HooksEnum {
  login = 'login',
  logout = 'logout',
  sign = 'sign'
}

export enum RouteNamesEnum {
  home = '/',
  dashboard = '/dashboard',
  unlock = '/unlock',
  disclaimer = '/disclaimer',
  send = '/send',
  logout = '/logout',
  sign = '/sign'
}

export enum HooksPageEnum {
  loginHook = `/hook/${HooksEnum.login}`
}
