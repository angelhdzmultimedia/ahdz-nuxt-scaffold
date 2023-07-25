import { e as execa } from '../shared/scaffold.a6e94dab.mjs';
import { a as consola } from '../shared/scaffold.26e5b5d6.mjs';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import { t as tryResolveModule } from '../shared/scaffold.a96fae2c.mjs';
import { d as defineNuxtCommand } from '../shared/scaffold.f78c58d8.mjs';
import { r as resolve } from '../shared/scaffold.ffb4843d.mjs';
import 'node:buffer';
import 'node:child_process';
import '../shared/scaffold.01558c01.mjs';
import '../shared/scaffold.24198af3.mjs';
import 'child_process';
import 'path';
import 'fs';
import 'assert';
import 'events';
import 'buffer';
import 'stream';
import 'util';
import 'node:url';
import 'node:os';
import 'node:fs';
import '../shared/scaffold.9a506861.mjs';
import 'node:module';
import 'node:assert';
import 'node:v8';

const MODULE_BUILDER_PKG = "@nuxt/module-builder";
const buildModule = defineNuxtCommand({
  meta: {
    name: "build-module",
    usage: "npx nuxi build-module [--stub] [rootDir]",
    description: `Helper command for using ${MODULE_BUILDER_PKG}`
  },
  async invoke(args) {
    const rootDir = resolve(args._[0] || ".");
    const hasLocal = await tryResolveModule(`${MODULE_BUILDER_PKG}/package.json`, rootDir);
    const execArgs = Object.entries({
      "--stub": args.stub,
      "--prepare": args.prepare
    }).filter(([, value]) => value).map(([key]) => key);
    let cmd = "nuxt-module-build";
    if (!hasLocal) {
      consola.warn(`Cannot find locally installed version of \`${MODULE_BUILDER_PKG}\` (>=0.2.0). Falling back to \`npx ${MODULE_BUILDER_PKG}\``);
      cmd = "npx";
      execArgs.unshift(MODULE_BUILDER_PKG);
    }
    await execa(cmd, execArgs, { preferLocal: true, stdio: "inherit", cwd: rootDir });
  }
});

export { buildModule as default };
