// Defaults also allow shared content to be imported by the Node server and tests.
export const BASE_PATH = import.meta.env?.BASE_URL ?? "/";
export const sitePath = (path: string) => BASE_PATH + path.replace(/^\//, "");
export function localPath(path: string) {
  if (path === BASE_PATH.replace(/\/$/, "")) return "/";
  return path.startsWith(BASE_PATH) ? "/" + path.slice(BASE_PATH.length) : null;
}
