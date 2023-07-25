import { e as execa } from '../shared/scaffold.a6e94dab.mjs';
import { s as showHelp } from '../shared/scaffold.d7a24875.mjs';
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
import '../shared/scaffold.ac398704.mjs';
import 'tty';

const devtools = defineNuxtCommand({
  meta: {
    name: "enable",
    usage: "npx nuxi devtools enable|disable [rootDir]",
    description: "Enable or disable features in a Nuxt project"
  },
  async invoke(args) {
    const [command, _rootDir = "."] = args._;
    const rootDir = resolve(_rootDir);
    if (!["enable", "disable"].includes(command)) {
      console.error(`Unknown command \`${command}\`.`);
      showHelp(this.meta);
      process.exit(1);
    }
    await execa("npx", ["@nuxt/devtools-wizard@latest", command, rootDir], { stdio: "inherit", cwd: rootDir });
  }
});

export { devtools as default };
