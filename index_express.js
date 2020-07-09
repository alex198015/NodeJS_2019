const express = require('express')
const path = require('path')

const app = express()

app.get('/', (req, res) => {
    // res.status(200)
    res.sendFile(path.join(__dirname, 'views2', 'index.html'))
})
app.get('/about', (req, res) => {
    // res.status(200)
    res.sendFile(path.join(__dirname, 'views2', 'about.html'))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
    
})