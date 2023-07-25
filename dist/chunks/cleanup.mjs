import { c as cleanupNuxtDirs } from '../shared/scaffold.e9070114.mjs';
import { d as defineNuxtCommand } from '../shared/scaffold.f78c58d8.mjs';
import { r as resolve } from '../shared/scaffold.ffb4843d.mjs';
import 'node:fs';
import '../shared/scaffold.26e5b5d6.mjs';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import '../shared/scaffold.3ae887f1.mjs';

const cleanup = defineNuxtCommand({
  meta: {
    name: "cleanup",
    usage: "npx nuxi clean|cleanup",
    description: "Cleanup generated nuxt files and caches"
  },
  async invoke(args) {
    const rootDir = resolve(args._[0] || ".");
    await cleanupNuxtDirs(rootDir);
  }
});

export { cleanup as default };
