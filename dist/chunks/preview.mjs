import { existsSync, promises } from 'node:fs';
import { dirname, relative } from 'node:path';
import { e as execa } from '../shared/scaffold.a6e94dab.mjs';
import { s as setupDotenv } from '../shared/scaffold.f11ea822.mjs';
import { a as consola } from '../shared/scaffold.26e5b5d6.mjs';
import 'node:util';
import 'node:process';
import 'node:tty';
import { l as loadKit } from '../shared/scaffold.43d6937c.mjs';
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
import 'os';
import 'crypto';
import 'node:fs/promises';
import 'module';
import 'perf_hooks';
import 'vm';
import 'url';
import 'process';
import 'v8';
import 'tty';
import '../shared/scaffold.a96fae2c.mjs';
import '../shared/scaffold.9a506861.mjs';
import 'node:module';
import 'node:assert';
import 'node:v8';

const preview = defineNuxtCommand({
  meta: {
    name: "preview",
    usage: "npx nuxi preview|start [--dotenv] [rootDir]",
    description: "Launches nitro server for local testing after `nuxi build`."
  },
  async invoke(args, options = {}) {
    process.env.NODE_ENV = process.env.NODE_ENV || "production";
    const rootDir = resolve(args._[0] || ".");
    const { loadNuxtConfig } = await loadKit(rootDir);
    const config = await loadNuxtConfig({ cwd: rootDir, overrides: options?.overrides || {} });
    const resolvedOutputDir = resolve(config.srcDir || rootDir, config.nitro.srcDir || "server", config.nitro.output?.dir || ".output", "nitro.json");
    const defaultOutput = resolve(rootDir, ".output", "nitro.json");
    const nitroJSONPaths = [resolvedOutputDir, defaultOutput];
    const nitroJSONPath = nitroJSONPaths.find((p) => existsSync(p));
    if (!nitroJSONPath) {
      consola.error("Cannot find `nitro.json`. Did you run `nuxi build` first? Search path:\n", nitroJSONPaths);
      process.exit(1);
    }
    const outputPath = dirname(nitroJSONPath);
    const nitroJSON = JSON.parse(await promises.readFile(nitroJSONPath, "utf-8"));
    consola.info("Node.js version:", process.versions.node);
    consola.info("Preset:", nitroJSON.preset);
    consola.info("Working dir:", relative(process.cwd(), outputPath));
    if (!nitroJSON.commands.preview) {
      consola.error("Preview is not supported for this build.");
      process.exit(1);
    }
    const envExists = args.dotenv ? existsSync(resolve(rootDir, args.dotenv)) : existsSync(rootDir);
    if (envExists) {
      consola.info("Loading `.env`. This will not be loaded when running the server in production.");
      await setupDotenv({ cwd: rootDir, fileName: args.dotenv });
    }
    consola.info("Starting preview command:", nitroJSON.commands.preview);
    const [command, ...commandArgs] = nitroJSON.commands.preview.split(" ");
    consola.log("");
    await execa(command, commandArgs, { stdio: "inherit", cwd: outputPath });
  }
});

export { preview as default };
