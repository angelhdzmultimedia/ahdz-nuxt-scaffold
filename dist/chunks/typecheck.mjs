import { e as execa } from '../shared/scaffold.a6e94dab.mjs';
import { t as tryResolveModule } from '../shared/scaffold.a96fae2c.mjs';
import { l as loadKit } from '../shared/scaffold.43d6937c.mjs';
import { w as writeTypes } from '../shared/scaffold.71066d61.mjs';
import { d as defineNuxtCommand } from '../shared/scaffold.f78c58d8.mjs';
import { r as resolve } from '../shared/scaffold.ffb4843d.mjs';
import 'node:buffer';
import 'node:path';
import 'node:child_process';
import 'node:process';
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
import 'node:util';
import '../shared/scaffold.9a506861.mjs';
import 'node:module';
import 'node:assert';
import 'node:v8';
import '../shared/scaffold.a685c563.mjs';
import '../shared/scaffold.df840f5e.mjs';

const typecheck = defineNuxtCommand({
  meta: {
    name: "typecheck",
    usage: "npx nuxi typecheck [--log-level] [rootDir]",
    description: "Runs `vue-tsc` to check types throughout your app."
  },
  async invoke(args, options = {}) {
    process.env.NODE_ENV = process.env.NODE_ENV || "production";
    const rootDir = resolve(args._[0] || ".");
    const { loadNuxt, buildNuxt } = await loadKit(rootDir);
    const nuxt = await loadNuxt({
      rootDir,
      overrides: {
        _prepare: true,
        logLevel: args["log-level"],
        ...options?.overrides || {}
      }
    });
    await writeTypes(nuxt);
    await buildNuxt(nuxt);
    await nuxt.close();
    const hasLocalInstall = await tryResolveModule("typescript", rootDir) && await tryResolveModule("vue-tsc/package.json", rootDir);
    if (hasLocalInstall) {
      await execa("vue-tsc", ["--noEmit"], { preferLocal: true, stdio: "inherit", cwd: rootDir });
    } else {
      await execa("npx", "-p vue-tsc -p typescript vue-tsc --noEmit".split(" "), { stdio: "inherit", cwd: rootDir });
    }
  }
});

export { typecheck as default };
