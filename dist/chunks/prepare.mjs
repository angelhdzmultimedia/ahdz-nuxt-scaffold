import { a as consola } from '../shared/scaffold.26e5b5d6.mjs';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import { a as clearBuildDir } from '../shared/scaffold.3ae887f1.mjs';
import { l as loadKit } from '../shared/scaffold.43d6937c.mjs';
import { w as writeTypes } from '../shared/scaffold.71066d61.mjs';
import { d as defineNuxtCommand } from '../shared/scaffold.f78c58d8.mjs';
import { r as resolve, a as relative } from '../shared/scaffold.ffb4843d.mjs';
import 'node:fs';
import '../shared/scaffold.a96fae2c.mjs';
import 'node:url';
import '../shared/scaffold.9a506861.mjs';
import 'node:module';
import 'node:assert';
import 'node:v8';
import '../shared/scaffold.a685c563.mjs';
import '../shared/scaffold.df840f5e.mjs';

const prepare = defineNuxtCommand({
  meta: {
    name: "prepare",
    usage: "npx nuxi prepare [--log-level] [rootDir]",
    description: "Prepare nuxt for development/build"
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
        ...options.overrides || {}
      }
    });
    await clearBuildDir(nuxt.options.buildDir);
    await buildNuxt(nuxt);
    await writeTypes(nuxt);
    consola.success("Types generated in", relative(process.cwd(), nuxt.options.buildDir));
  }
});

export { prepare as default };
