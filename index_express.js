const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const mongoose = require('mongoose')
const User = require('./models/user')

const app = express()

const hbs = exphbs.create({
    defaultLayout : 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views2')

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5f19e1e715507e2fb49f9816')
           
        req.user = user
        
        next()
    } catch(e) {
        console.log(e);
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)

const PORT = process.env.PORT || 3000


async function start() {
    try {
        const url = `mongodb+srv://Alex80:UHR1cFeLDNZejuMz@cluster0.ru3vg.mongodb.net/shop`
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

        const candidate = await User.findOne()
        if(!candidate) {
            const user = new User({
                email: 'kitten20811@gmail.com',
                name: 'Alex',
                cart: {items: []}
            })
            await user.save()
        }
        app.listen(PORT, () => {
            console.log(` Server is running on port ${PORT}`);
        
    })

    } catch(e) {
        console.log(e);
    }
    
}

start()


// app.get('/', (req, res) => {
//     // res.status(200)
//     // res.sendFile(path.join(__dirname, 'views2', 'index.html'))
//     res.render('index',{
//         title:'Главная страница',
//         isHome: true
//     })
// })

// app.get('/add', (req, res) => {
//     // res.status(200)
//     // res.sendFile(path.join(__dirname, 'views2', 'about.html'))
//     res.render('add',{
//         title:'Добавить курс',
//         isAdd: true
//     })
// })

// app.get('/courses', (req, res) => {
//     res.render('courses',{
//         title:'Курсы',
//         isCourses: true
//     })
// })
