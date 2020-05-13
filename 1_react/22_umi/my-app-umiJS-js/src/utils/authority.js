import { reloadAuthorized } from "./Authorized" //使用localStorage

export function getAuthority(str) {
  const authorityString = // authorityString could be admin, "admin", ["admin"]
    typeof str === "undefined" && localStorage ? localStorage.getItem('antd-pro-authority') : str
  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (error) {
    authority = authorityString;
  }

  if (typeof authority === "string") {
    return [authority];
  }

  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === "site") {
    return ['admin'];
  }
  return authority;
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
  reloadAuthorized();
}