// const obj = require('./user')

// console.log(obj.user)

// obj.sayHello()

const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.write('<h1>Hello from NodeJS</h1>')
    res.write('<h3>Hello from NodeJS</h3>')
    res.write('<h6>Hello from NodeJS</h6>')
    res.end(`<div style="background: red; width: 200px; height: 200px">
    <h1>Test</h1>
    </div>`)

})

server.listen(3000, () => {
    console.log('server is working...');
    
})