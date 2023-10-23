import {parseArgs} from 'node:util'
import { commands, findCommand } from './commands'
import consola from 'consola'

async function main() {
  const {positionals: [commandArg, ...rest]} = parseArgs({allowPositionals: true})
  const {value: command, error} = await findCommand(commandArg, process.cwd())

  if (error) {
    consola.warn(error)
    process.exit(0)
  }
  command(...rest)
}

main()