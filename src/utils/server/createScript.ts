import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'

export function createScript(script: string) {
    if (!existsSync('./tmp')) {
        mkdirSync('./tmp')
    }

    const uri = `./tmp/${uuidv4()}.js`

    writeFileSync(uri, script)

    return uri
}
