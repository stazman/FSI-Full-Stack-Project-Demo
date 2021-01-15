const { spawn: nativeSpawn } = require('child_process')
const Path = require('path')

let main = async () => {
    console.log('Installing backend dependencies')
    await spawn('./backend', `npm`, 'install')
    console.log('Starting backend')
    spawn('./backend',`npm`, 'start')
    await sleep(1000)
    console.log('Installing frontend dependencies')
    await spawn('./frontend',`npm`, 'install')
    console.log('Starting frontend')
    spawn('./frontend',`npm`, 'start')
}

let spawn = (relativePath, command, ...args) => new Promise(resolve => {
    const cwd = Path.resolve(relativePath)
    const process = nativeSpawn(command, args, { cwd, stdio: 'inherit'})
    process.on('close', resolve)
})

let sleep = time => new Promise( resolve => setTimeout(resolve, time))

main()