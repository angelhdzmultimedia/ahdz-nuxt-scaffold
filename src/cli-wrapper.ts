import {parseArgs} from 'node:util'
import { commands } from './commands'
import consola from 'consola'
import { runCommand } from 'citty'

async function main() {
  const {positionals: [commandName, ...rest]} = parseArgs({allowPositionals: true})
  const esm = await commands[commandName as keyof typeof commands]()

  if (!(commandName in commands)) {
    throw new Error(`Command "${commandName}" not available.`)
  }

  await runCommand(await commands[commandName as keyof typeof commands](), {
    rawArgs: rest
  })
}

main()