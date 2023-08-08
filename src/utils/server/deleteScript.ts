import { unlinkSync } from 'fs'

export function deleteScript(uri: string) {
    unlinkSync(uri)
}
