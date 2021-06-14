const express = require('express')

const getDatabase = require('./services/notion')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('src'))

app.get('/pages', async (req,res) => {
    const pages = await getDatabase()
    res.json(pages)
})

app.listen(PORT, console.log(`Server started on port ${PORT}`))