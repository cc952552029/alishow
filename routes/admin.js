
/** 
 * 管理系统模块
*/

const express = require('express')
// 创建一个独立路由模块
const router = express.Router()
// 添加一个自定义成员
router.prefix = '/admin'

router.get('/', (req, res, next) => {

//     const sessionUser = req.session.user
//     if(!sessionUser){
//         res.redirect('/admin/login')
//     }
//     res.render('admin/index.html' ,{
//         sessionUser:req.session.user

//     })
// })

res.render('admin/index.html')

})
router.get('/categories', (req, res, next) =>{
    res.render('admin/categories.html')

})


router.get('/login', (req, res, next) =>{
    res.render('admin/login.html' )
})

router.get('/comments',(req, res, next) =>{
    res.render('admin/comments.html')
})

router.get('/nav-menus',(req, res, next) =>{
    res.render('admin/nav-menus.html')
})

router.get('/password-reset',(req, res, next) =>{
    res.render('admin/password-reset.html')

})

router.get('/post-add' ,(req, res, next) =>{
    res.render('admin/post-add.html')

})

router.get('/posts', (req, res, next)=>{
    res.render('admin/posts.html')
})

router.get('/profile', (req, res, next) =>{
    res.render('admin/profile.html')
})

router.get('/settings' , (req, res, next) =>{
    res.render('admin/settings.html')
})

router.get('/slides', (req, res, next) =>{
    res.render('admin/slides.html')
})

router.get('/users', (req, res, next) =>{
    res.render('admin/users.html')
})

module.exports = router