import { p as prompt } from '../shared/scaffold.8eb8f1f4.mjs';
import { d as defineNuxtCommand } from '../shared/scaffold.f78c58d8.mjs';
import { resolve, join } from 'node:path';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { rimrafSync } from 'rimraf';
import 'inquirer';

function asyncSpawn(...args) {
  return new Promise((resolve2, reject) => {
    const result = spawn(args[0], args[1], {
      ...args[2],
      stdio: "inherit"
    });
    result.on("message", (data) => {
      console.log(data);
    });
    result.on("exit", () => resolve2());
    result.on("error", (error) => reject(error));
  });
}
function write(file, data) {
  writeFileSync(file, data);
}
function writeJson(file, data) {
  write(file, JSON.stringify(data, null, 2));
}
function read(file) {
  return readFileSync(file).toString();
}
function readJson(file) {
  return JSON.parse(read(file));
}
async function main(args) {
  const name = await prompt({
    name: "value",
    type: "input",
    message: "App Name?"
  });
  const framework = await prompt({
    name: "value",
    message: "App Framework?",
    type: "list",
    choices: [
      {
        name: "Nuxt (Frontend)",
        value: "nuxt",
        key: "nuxt"
      },
      {
        name: "Nest (Backend)",
        value: "nest",
        key: "nest"
      },
      {
        name: "Vue (Frontend)",
        value: "vue",
        key: "vue"
      }
    ]
  });
  if (framework.value === "nest") {
    await asyncSpawn("pwsh", [`-Command`, "nest", "new", name.value]);
    const packageJson = readJson(resolve(name.value, "package.json"));
    packageJson.dependencies ?? (packageJson.dependencies = {});
    packageJson.devDependencies ?? (packageJson.devDependencies = {});
    packageJson.scripts = {
      ...packageJson.scripts,
      format: 'prettier --write "src/**/*.ts"',
      ["start:dev"]: "pnpm format && nest start --watch",
      clean: "rimraf node_modules dist pnpm-lock.yaml"
    };
    const dependencies = [
      "@prisma/client",
      "@nestjs/config",
      "@nestjs/websockets",
      "@nestjs/swagger"
    ];
    const devDependencies = [
      "rimraf"
    ];
    console.log("\nAdding development and production dependencies...");
    for (const value of dependencies) {
      packageJson.dependencies[value] = "*";
      console.log(`${value} production dependency added.`);
    }
    for (const value of devDependencies) {
      packageJson.devDependencies[value] = "*";
      console.log(`${value} development dependency added.`);
    }
    console.log("\nRemoving development and production dependencies...");
    const disposedDeps = [
      ...Object.keys(packageJson.devDependencies).filter((item) => item.includes("eslint"))
    ];
    for (const dep of disposedDeps) {
      delete packageJson.devDependencies[dep];
      console.log(`${dep} development dependency removed.`);
    }
    console.log("Modifying settings...\n");
    console.log("Creating files...\n");
    console.log("package.json created.\n");
    writeJson(resolve(name.value, "package.json"), packageJson);
    const nestConfig = readJson(resolve(name.value, "nest-cli.json"));
    nestConfig.generateOptions = {
      spec: false
    };
    console.log("nest-cli.json created.\n");
    writeJson(resolve(name.value, "nest-cli.json"), nestConfig);
    const prettierConfig = readJson(resolve(name.value, ".prettierrc"));
    prettierConfig.semi = false;
    console.log(".prettierrc created.\n");
    writeJson(resolve(name.value, ".prettierrc"), prettierConfig);
    console.log("Deleting files...\n");
    const disposedFiles = [
      ".eslintrc.js"
    ];
    for (const file of disposedFiles) {
      console.log(`${file} deleted.`);
      rimrafSync(resolve(name.value, file));
    }
    console.log("Deleting tests files...");
    rimrafSync(`${name.value}/src/**/*.spec.ts`, { glob: true, filter(path, options) {
      console.log(`${path} deleted.`);
      return true;
    } });
    rimrafSync(resolve(name.value, "test"));
    console.log(`/test deleted.`);
    console.log("Installing dependencies...\n");
    await asyncSpawn("pwsh", ["-Command", "pnpm", "install"]);
    console.log("Updating dependencies...\n");
    await asyncSpawn("pwsh", ["-Command", "pnpm", "update"]);
  }
  if (framework.value === "nuxt") {
    await asyncSpawn("pwsh", [`-Command`, `pnpx nuxi init ${name.value}`]);
    const packageJson = readJson(resolve(name.value, "package.json"));
    packageJson.dependencies ?? (packageJson.dependencies = {});
    packageJson.devDependencies ?? (packageJson.devDependencies = {});
    packageJson.scripts = {
      ...packageJson.scripts,
      clean: "rimraf node_modules .nuxt pnpm-lock.yaml"
    };
    const dependencies = [
      "nuxt-quasar-ui",
      "quasar",
      "@quasar/extras",
      "pinia",
      "@pinia/nuxt",
      "@nuxtjs/i18n",
      "@vue-macros/nuxt"
    ];
    const devDependencies = [
      "rimraf",
      "@nuxt/devtools"
    ];
    console.log("\nAdding development and production dependencies...");
    for (const value of dependencies) {
      packageJson.dependencies[value] = "*";
      console.log(`${value} production dependency added.`);
    }
    for (const value of devDependencies) {
      packageJson.devDependencies[value] = "*";
      console.log(`${value} development dependency added.`);
    }
    packageJson.dependencies["@nuxtjs/i18n"] = "^8.0.0-beta.12";
    console.log("\nCreating files...\n");
    console.log("package.json created.\n");
    writeJson(resolve(name.value, "package.json"), packageJson);
    console.log("nuxt.config.ts created.\n");
    write(
      resolve(name.value, "nuxt.config.ts"),
      `export default defineNuxtConfig({
  ssr: false,
  devtools: true,
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      }
    }
  },

  modules: [
    '@pinia/nuxt',
    'nuxt-quasar-ui',
    '@nuxtjs/i18n',
    '@vue-macros/nuxt',
  ],

  imports: {
    dirs: ['stores/**']
  },

  pinia: {
    autoImports: ['defineStore']
  },

  i18n: {
    langDir: 'lang',
    lazy: true,
    defaultLocale: 'en-US',
    locales: [
      {
        code: 'en-US',
        name: 'English (United States)',
        file: 'en-US.json',
      },
      {
        code: 'es-ES',
        name: 'Espa\xF1ol (Espa\xF1a)',
        file: 'es-ES.json',
      }
    ]
  },

  quasar: {
    iconSet: 'material-icons',
    plugins: [
      'Dark',
      'Notify',
      'Dialog'
    ],
    extras: {
      font: 'roboto-font',
      fontIcons: [
        'fontawesome-v6',
        'material-icons',
        'mdi-v7',
        'ionicons-v4'
      ]
    }
  }
})
  
`
    );
    const dirs = ["lang"];
    for (const dir of dirs) {
      const path = join(name.value, dir);
      if (!existsSync(path)) {
        mkdirSync(path);
      }
    }
    console.log("lang/en-US.json created.\n");
    writeJson(join(name.value, "lang", "en-US.json"), {
      message: "Hello Locale"
    });
    console.log("lang/es-ES.json created.\n");
    writeJson(join(name.value, "lang", "es-ES.json"), {
      message: "Hola Localizaci\xF3n"
    });
    console.log("\nUpdating Nuxt...\n");
    await asyncSpawn("pwsh", ["-Command", "pnpx", "nuxi", "upgrade", "--force"]);
    console.log("Updating dependencies...\n");
    await asyncSpawn("pwsh", ["-Command", "pnpm", "update"]);
  }
  console.log("\nEnjoy your new application! \u{1F525}");
}
const _new = defineNuxtCommand({
  meta: {
    name: "new",
    usage: "scaffold new [app-name]",
    description: "Build nuxt and analyze production bundle (experimental)"
  },
  async invoke(args) {
    await main();
  }
});

export { _new as default };
