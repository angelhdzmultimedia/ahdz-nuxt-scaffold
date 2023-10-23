import { join } from 'path'

export async function findCommand(name: string, root: string): Promise<{value: any | undefined, error: string | undefined}> {
  try {
    const esm = await import(join(root, 'src', 'commands', name))
    return {value: esm.default, error: undefined}
  } catch (error: unknown) {
    return {value: undefined, error: `Command not available. \n\nAvailable commands: ${commands}`}
  }
}

export const commands: string[] = [
  'add',
  'new',
]