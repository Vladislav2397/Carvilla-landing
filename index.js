// run `node index.js` in the terminal

import express from 'express'
import cors from 'cors'
import path from 'path'
import compression from 'compression'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000

console.log(`Hello Node.js v${process.versions.node}!`);

app.use(compression())
app.use('/assets', express.static(__dirname + '/dist/assets'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})