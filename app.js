const express = require('express')
const path = require('path')
const app = express()
const router = require('./routes')
const adminRouter = require('./routes/admin')
const glob = require('glob')
const session = require('express-session')

// const apiRouter = require('./routes/api')
const MySQLStore =  require('express-mysql-session')(session)


const sessionStore = new MySQLStore({
host:'localhost',
port:3306,
user:'root',
password:'root',
database:'alishow'
})



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store:sessionStore,
  cookie:{
    maxAge:100000* 60

  }

}))


// 开放静态资源
app.use('/public', express.static(path.join(__dirname, './public')))

app.engine('html' , require('express-art-template'));
app.set('view options',{
  debug: process.env.NODE_ENV !=='production'

})

app.use(express.urlencoded())
// 挂载客户端路由
// app.use(router)
// app.use('/admin', adminRouter)
// app.use('/admin/categories', adminRouter)
// app.use('/api/', apiRouter)

// glob('./routes/**/*.js', (err, files) =>{
//   if(err){
//     throw err
//   }
// })

app.use('/admin',(req, res, next) =>{
  if(req.originalUrl ==='/admin/login'){
    return next()
  }
  const sessionUser = req.session.user
  if(!sessionUser){
    return res.redirect('/admin/login')
  }
  app.locals.sessionUser = sessionUser
  next()
})



const files = glob.sync('./routes/**/*.js')
files.forEach(routerPath => {
  const router = require(routerPath)
  if(typeof router === 'function'){
    app.use(router.prefix || '/',router)
  }
})


app.use((err, req, res, next)=>{
   res.status(500).send({
            statusCode:500,
            message:'Internal Server error',
            error:err.message
            
        })
})





app.listen(3000,()=>console.log('Server running http://127.0.0.1:3000/'))