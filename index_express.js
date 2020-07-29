const express = require('express')
const path = require('path')
const csrf = require('csurf')
const flash = require('connect-flash')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')

const MONGODB_URI = `mongodb+srv://Alex80:UHR1cFeLDNZejuMz@cluster0.ru3vg.mongodb.net/shop`

const app = express()

const hbs = exphbs.create({
    defaultLayout : 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
})

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views2')

// app.use(async (req, res, next) => {
//     try {
//         const user = await User.findById('5f19e1e715507e2fb49f9816')
           
//         req.user = user
        
//         next()
//     } catch(e) {
//         console.log(e); 
//     }
// })



app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(csrf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000


async function start() {
    try {
        
        await mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

        // const candidate = await User.findOne()
        // if(!candidate) {
        //     const user = new User({
        //         email: 'kitten20811@gmail.com',
        //         name: 'Alex',
        //         cart: {items: []}
        //     })
        //     await user.save()
        // }
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
