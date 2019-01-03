/**
 * 普通客户端路由
 */


const experss = require('express')
// 创建独立的路由模块
const router = experss.Router()

router.prefix = '/'


router.get('/', (req, res, next) =>{
    res.render('index.html',
    // res.render 的本质就是封装了文件读取和模板引擎渲染.
    // 1.读取指定的模板文件
    // 2.使用模板引擎解析替换模板字符串
    // 3.把处理的结果发送给客户端
    )
  })

 
  router.get('/detail', (req, res, next) =>{
    res.render('detail.html')
  })

  router.get('/list' , (req, res, next) =>{
    res.render('list.html')
  })

  module.exports = router