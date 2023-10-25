import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { loadNuxtConfig } from '@nuxt/kit';
import { c as consola, d as defineCommand } from '../cli-wrapper.mjs';
import 'node:util';
import 'node:process';
import 'node:tty';
import { p as prompt } from '../shared/scaffold.8eb8f1f4.mjs';
import { resolve as resolve$1 } from 'path';
import 'inquirer';

const templates = [
  "page",
  "store",
  "store:actions",
  "store:state",
  "server:api",
  "client:api",
  "composable",
  "component",
  "layout",
  "entity",
  "type",
  "plugin",
  "server:plugin",
  "middleware",
  "env"
];

function capitalizeWords(words) {
  let _text = "";
  for (const word of words) {
    _text += capitalize(word);
  }
  return _text;
}
function capitalize(text) {
  return `${text[0].toUpperCase()}${text.substring(1).toLowerCase()}`;
}

async function generateTemplate(templateData, baseDir) {
  const { content, name, path, onFileCreated, data } = templateData;
  const cwd = resolve(process.cwd() || ".");
  const config = await loadNuxtConfig({ cwd });
  const srcDir = config.srcDir;
  const _path = resolve(srcDir, path);
  const parentDir = dirname(_path);
  if (!existsSync(parentDir)) {
    consola.info("Creating directory", parentDir);
    if (name === "page") {
      consola.info("This enables vue-router functionality!");
    }
    if (name === "store") {
      consola.info("This enables pinia store functionality!");
    }
    await mkdir(parentDir, { recursive: true });
  }
  let _content = content;
  if (data) {
    for (const key in data) {
      _content = _content.split(`[${key}]`).join(data[key]);
    }
  }
  await writeFile(path, _content.trim() + "\n");
  if (onFileCreated) {
    const templateData2 = await onFileCreated({ currentPath: _path });
    templateData2 && await generateTemplate(templateData2);
  }
}

async function main(args) {
  const cwd = resolve$1(args.cwd || ".");
  await loadNuxtConfig({ cwd });
  const template = await prompt({
    name: "value",
    type: "rawlist",
    message: "What to scaffold?",
    choices: [
      ...templates.filter((item) => item !== "store:actions" && item !== "store:state").map((item) => ({
        name: capitalizeWords(item.split(":")),
        key: item,
        value: item
      })),
      {
        name: "[Exit]",
        key: "exit",
        value: "exit"
      }
    ]
  });
  console.log(`Selected Template: ${template.value}`);
  if (template.value === "exit") {
    console.log("Thanks for using nuxt-scaffold! console.log('Have fun!') \u270C\u{1F60A}");
    return;
  }
  const name = await prompt({
    name: "value",
    type: "input",
    message: "Name?"
  });
  const foundTemplate = templates.find((item) => item === template.value);
  if (templates.some((item) => item === foundTemplate)) {
    const _templateName = foundTemplate.split(":").join("/");
    const _module = await import(`../templates/${_templateName}`);
    const _template = _module.default;
    const _templateBaseDir = resolve$1(cwd, "templates", _templateName);
    const _templateData = await _template.apply(void 0, [{ name: name.value, baseDir: _templateBaseDir }]);
    await generateTemplate(_templateData);
  } else {
    consola.error("Scaffold template not valid.");
    consola.info(`The available scaffold templates are: 
${templates.map((item) => `
- item`)}`);
  }
  await main(args);
}
const add = defineCommand({
  meta: {
    name: "add",
    description: "Build nuxt and analyze production bundle (experimental)"
  },
  async run({ args }) {
    await main(args);
  }
});

export { add as default };
