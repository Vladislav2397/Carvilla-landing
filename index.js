// run `node index.js` in the terminal

console.log(`Hello Node.js v${process.versions.node}!`);
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.use(express.static(__dirname + '/public'))

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})