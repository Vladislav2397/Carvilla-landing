// run `node index.js` in the terminal

console.log(`Hello Node.js v${process.versions.node}!`);
const express = require('express')
const cors = require('cors')
const path = require('path')
const compression = require('compression')
const app = express()
const PORT = 3000

app.use(compression())
app.use('/assets', express.static(__dirname + '/dist/assets'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})