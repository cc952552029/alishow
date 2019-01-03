/**
 * 用户相关路由
 */

const express = require('express')

const router = express.Router()

const db = require('../../utils/db')
const md5 = require('../../utils/md5')

router.prefix = '/api'


router.get('/users/bloated' , (req, res, next) =>{

    db.query('SELECT *FROM `ali_admin`' ,(err,ret) =>{
        if(err){
            return next(err)
        }
        res.send({
            success:true,
            data:ret
        })
    })
})

router.post('/users/add' , (req, res, next) =>{
   

    const body = req.body
// 验证邮箱
db.query('SELECT *FROM `ali_admin` WHERE `admin_email`=?' , [body.admin_email] ,(err, ret) =>{
      if(err)  {
          return next(err)
      }
      if(ret[0]){
          return res.send({
              success:false,
              message: '邮箱已被占用'
          })
      }
// 验证别名
      db.query('SELECT * FROM `ali_admin` WHERE `admin_slug`=?', [body.admin_slug], (err, ret) => {
        if (err) {
          return next(err)
        }
        if (ret[0]) {
          return res.send({
            success: false,
            message: '别名已被占用'
          })
        }

    // 验证昵称
    db.query('SELECT * FROM `ali_admin` WHERE `admin_nickname`=?',[body.admin_nickname] ,(err,ret)=>{
        if(err){
            return next(err)
        }
        if(ret[0]){
            return res.send({
                success:false,
                message:'昵称已被占用'
            })
        }
   
    db.query('INSERT INTO `ali_admin` SET ?',{
        admin_email : body.admin_email,
        admin_slug : body.admin_slug,
        admin_nickname :body.admin_nickname,
        admin_pwd : md5(body.admin_pwd)

    },(err, ret) =>{
        
        if(err){
            return next(err)
        }
        res.send({
            success : true,
            data : ret
          })
        })
      })
    })
  })
})

router.get('/users/check_email', (req, res, next) => {
    // 1. 获取查询参数 admin_email
    const { admin_email } = req.query
  
    // 2. 操作数据库，查询 admin_email 是否已存在
    db.query('SELECT * FROM `ali_admin` WHERE `admin_email`=?', [admin_email], (err, ret) => {
      if (err) {
        return next(err)
      }
  
      // 3. 如果已存在，则发送响应 false
      //    如果不存在，表示可以使用，发送响应 true
      res.send(ret[0] ? false : true)
    })
  })
  

router.post('/users/login' , (req, res, next) =>{

    const body = req.body

    db.query('SELECT * FROM `ali_admin` WHERE `admin_email` =?',[body.admin_email] ,(err, ret)=>{
       const user = ret[0]
        if(err){
            return next(err)
        }
        if(!user){
            return res.send({
                success:false,
                message:'用户不存在'
            })
        }
        if(md5(body.admin_pwd) !==user.admin_pwd){
            return res.send({
                success:false,
                message:'密码错误'
            })
        }
        req.session.user =user
        res.send({
            success:true,
            message:'登陆成功'
        })

    })
})

router.get('/admin/logout' ,(req, res, next) =>{
    delete req.session.user
    res.redirect('/admin/login')
})


module.exports = router