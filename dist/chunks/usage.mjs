import { c as cyan } from '../shared/scaffold.ac398704.mjs';
import { s as showHelp } from '../shared/scaffold.d7a24875.mjs';
import { d as defineNuxtCommand, c as commands } from '../shared/scaffold.f78c58d8.mjs';
import 'tty';

const usage = defineNuxtCommand({
  meta: {
    name: "help",
    usage: "nuxt help",
    description: "Show help"
  },
  invoke(_args) {
    const sections = [];
    sections.push(`Usage: ${cyan(`npx nuxi ${Object.keys(commands).join("|")} [args]`)}`);
    console.log(sections.join("\n\n") + "\n");
    showHelp({});
  }
});

export { usage as default };
