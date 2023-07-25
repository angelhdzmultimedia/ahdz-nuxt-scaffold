import { a as consola } from '../shared/scaffold.26e5b5d6.mjs';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import { w as writeTypes } from '../shared/scaffold.71066d61.mjs';
import { l as loadKit } from '../shared/scaffold.43d6937c.mjs';
import { a as clearBuildDir } from '../shared/scaffold.3ae887f1.mjs';
import { o as overrideEnv } from '../shared/scaffold.d21ab543.mjs';
import { s as showVersions } from '../shared/scaffold.fa150e2f.mjs';
import { d as defineNuxtCommand } from '../shared/scaffold.f78c58d8.mjs';
import { r as resolve, a as relative } from '../shared/scaffold.ffb4843d.mjs';
import 'node:fs';
import '../shared/scaffold.a685c563.mjs';
import '../shared/scaffold.9a506861.mjs';
import 'node:module';
import 'node:url';
import 'node:assert';
import 'node:v8';
import '../shared/scaffold.df840f5e.mjs';
import '../shared/scaffold.a96fae2c.mjs';
import '../shared/scaffold.24198af3.mjs';
import 'assert';
import '../shared/scaffold.ac398704.mjs';
import 'tty';

const buildCommand = defineNuxtCommand({
  meta: {
    name: "build",
    usage: "npx nuxi build [--prerender] [--dotenv] [--log-level] [rootDir]",
    description: "Build nuxt for production deployment"
  },
  async invoke(args, options = {}) {
    overrideEnv("production");
    const rootDir = resolve(args._[0] || ".");
    showVersions(rootDir);
    const { loadNuxt, buildNuxt, useNitro } = await loadKit(rootDir);
    const nuxt = await loadNuxt({
      rootDir,
      dotenv: {
        cwd: rootDir,
        fileName: args.dotenv
      },
      overrides: {
        logLevel: args["log-level"],
        // TODO: remove in 3.8
        _generate: args.prerender,
        ...args.prerender ? { nitro: { static: true } } : {},
        ...options?.overrides || {}
      }
    });
    const nitro = useNitro?.();
    await clearBuildDir(nuxt.options.buildDir);
    await writeTypes(nuxt);
    nuxt.hook("build:error", (err) => {
      consola.error("Nuxt Build Error:", err);
      process.exit(1);
    });
    await buildNuxt(nuxt);
    if (args.prerender) {
      if (!nuxt.options.ssr) {
        consola.warn("HTML content not prerendered because `ssr: false` was set. You can read more in `https://nuxt.com/docs/getting-started/deployment#static-hosting`.");
      }
      const dir = nitro?.options.output.publicDir;
      const publicDir = dir ? relative(process.cwd(), dir) : ".output/public";
      consola.success(`You can now deploy \`${publicDir}\` to any static hosting!`);
    }
  }
});

export { buildCommand as default };
