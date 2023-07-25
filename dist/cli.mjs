import { m as mri, c as commands } from './shared/scaffold.f78c58d8.mjs';
import { r as red } from './shared/scaffold.ac398704.mjs';
import { a as consola } from './shared/scaffold.26e5b5d6.mjs';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import { e as engines, a as showBanner } from './shared/scaffold.fa150e2f.mjs';
import { s as showHelp } from './shared/scaffold.d7a24875.mjs';
import 'tty';
import './shared/scaffold.24198af3.mjs';
import 'assert';
import './shared/scaffold.df840f5e.mjs';
import 'node:module';
import './shared/scaffold.ffb4843d.mjs';

async function checkEngines() {
  const satisfies = await import('./chunks/satisfies.mjs').then(function (n) { return n.s; }).then((r) => r.default || r);
  const currentNode = process.versions.node;
  const nodeRange = engines.node;
  if (!satisfies(currentNode, nodeRange)) {
    console.warn(`Current version of Node.js (\`${currentNode}\`) is unsupported and might cause issues.
       Please upgrade to a compatible version (${nodeRange}).`);
  }
}

async function _main() {
  const _argv = (process.env.__CLI_ARGV__ ? JSON.parse(process.env.__CLI_ARGV__) : process.argv).slice(2);
  const args = mri(_argv, {
    boolean: [
      "no-clear"
    ]
  });
  const command = args._.shift() || "usage";
  showBanner(command === "dev" && args.clear !== false && !args.help);
  if (!(command in commands)) {
    console.log("\n" + red("Invalid command " + command));
    await commands.usage().then((r) => r.invoke());
    process.exit(1);
  }
  setTimeout(() => {
    checkEngines().catch(() => {
    });
  }, 1e3);
  const cmd = await commands[command]();
  if (args.h || args.help) {
    showHelp(cmd.meta);
  } else {
    const result = await cmd.invoke(args);
    return result;
  }
}
consola.wrapAll();
const wrapReporter = (reporter) => ({
  log(logObj, ctx) {
    if (!logObj.args || !logObj.args.length) {
      return;
    }
    const msg = logObj.args[0];
    if (typeof msg === "string" && !process.env.DEBUG) {
      if (msg.startsWith("[Vue Router warn]: No match found for location with path")) {
        return;
      }
      if (msg.includes("ExperimentalWarning: The Fetch API is an experimental feature")) {
        return;
      }
      if (msg.startsWith("Sourcemap") && msg.includes("node_modules")) {
        return;
      }
    }
    return reporter.log(logObj, ctx);
  }
});
consola.options.reporters = consola.options.reporters.map(wrapReporter);
process.on("unhandledRejection", (err) => consola.error("[unhandledRejection]", err));
process.on("uncaughtException", (err) => consola.error("[uncaughtException]", err));
function main() {
  _main().then((result) => {
    if (result === "error") {
      process.exit(1);
    } else if (result !== "wait") {
      process.exit();
    }
  }).catch((error) => {
    consola.error(error);
    process.exit(1);
  });
}

export { main };
