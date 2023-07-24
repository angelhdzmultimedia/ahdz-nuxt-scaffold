import buildCommand from './build.mjs';
import { d as defineNuxtCommand } from '../shared/scaffold.f78c58d8.mjs';
import '../shared/scaffold.26e5b5d6.mjs';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import '../shared/scaffold.71066d61.mjs';
import 'node:fs';
import '../shared/scaffold.a685c563.mjs';
import '../shared/scaffold.9a506861.mjs';
import 'node:module';
import 'node:url';
import 'node:assert';
import 'node:v8';
import '../shared/scaffold.ffb4843d.mjs';
import '../shared/scaffold.df840f5e.mjs';
import '../shared/scaffold.43d6937c.mjs';
import '../shared/scaffold.a96fae2c.mjs';
import '../shared/scaffold.3ae887f1.mjs';
import '../shared/scaffold.d21ab543.mjs';
import '../shared/scaffold.fa150e2f.mjs';
import '../shared/scaffold.24198af3.mjs';
import 'assert';
import '../shared/scaffold.ac398704.mjs';
import 'tty';

const generate = defineNuxtCommand({
  meta: {
    name: "generate",
    usage: "npx nuxi generate [rootDir] [--dotenv]",
    description: "Build Nuxt and prerender static routes"
  },
  async invoke(args, options = {}) {
    args.prerender = true;
    await buildCommand.invoke(args, options);
  }
});

export { generate as default };
