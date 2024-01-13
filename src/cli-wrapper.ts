import {parseArgs} from 'node:util'
import { commands } from './commands'
import { runCommand } from 'citty'

export async function runMain() {
  const {positionals: [commandName, ...rest]} = parseArgs({allowPositionals: true})

  if (!(commandName in commands)) {
    throw new Error(`Command "${commandName}" not available.`)
  }

  await runCommand(await commands[commandName as keyof typeof commands](), {
    rawArgs: rest,
  })
}

