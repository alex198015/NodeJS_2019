// const obj = require('./user')

// console.log(obj.user)

// obj.sayHello()

const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    // console.log(req.url);
    // res.write('<h1>Hello from NodeJS</h1>')
    // res.write('<h3>Hello from NodeJS</h3>')
    // res.write('<h6>Hello from NodeJS</h6>')
    // res.end(`<div style="background: blue; width: 200px; height: 200px">
    // <h1>Test</h1>
    // </div>`)
    if(req.method === 'GET'){
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        if(req.url === '/'){
            fs.readFile(path.join(__dirname, 'views', 'index.html'), 'utf-8',
            (err, content) => {
                if(err) throw new Error(err)
                res.end(content)
                }
                
            )
        }else if(req.url === '/about'){
            fs.readFile(path.join(__dirname, 'views', 'about.html'), 'utf-8',
            (err, content) => {
                if(err) throw new Error(err)
                res.end(content)
                }
                
            )
        }else if(req.url === '/api/users'){
            res.writeHead(200, {
                'Content-Type': 'text/json'
            })

            const users = [
                {name: 'Alex', age: 39},
                {name: 'Elena', age: 23}
            ]
           res.end(JSON.stringify(users))

    }
}else if(req.method === 'POST'){

        const body = []
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        req.on('data', data => {
            body.push(Buffer.from(data))
        })
        req.on('end', () => {
            const message = body.toString().split('=')[1];

            res.end(`
        <h1>Ваше сообщение: ${message}</h1>
        `)

        })
    }

})

server.listen(3000, () => {
    console.log('server is working...');
    
})