import { pathToFileURL } from 'node:url';
import { r as resolvePath, i as interopDefault } from './scaffold.9a506861.mjs';

async function tryResolveModule(id, url = import.meta.url) {
  try {
    return await resolvePath(id, { url });
  } catch {
  }
}
async function importModule(id, url = import.meta.url) {
  const resolvedPath = await resolvePath(id, { url });
  return import(pathToFileURL(resolvedPath).href).then(interopDefault);
}

export { importModule as i, tryResolveModule as t };
