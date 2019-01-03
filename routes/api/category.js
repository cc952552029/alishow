const express = require('express')

const router = express.Router()

const db = require('../../utils/db')

router.prefix = '/api'



router.get('/categories', (req, res, next) =>{
    db.query('SELECT *FROM `ali_cate`' ,(err, ret) =>{
       if(err){
        return next(err)
       }
       res.send({
         success: true,
         data: ret
       })
    })
})

router.get('/categories/delete', (req, res, next) => {
    const { id } = req.query
    db.query('DELETE FROM `ali_cate` WHERE `cate_id`=?' , [id],(err, ret) =>{
    if(err){
        
        return next(err)
    }
   res.send({
       success:true
    })
  })
 })

router.post('/categories/add', (req, res, next) =>{
    //1. 获取表单请求体数据
  //  console.log(req.body)
    
    const body = req.body;
    //2.操作数据库, 执行插入数据
   // sql 语句中的 问号 不是 sql语法  在这里是一个占坑符
   // mysql 包中 的query 方法 会将第二个参数对象转换为 filed1=value1,filed2=value2,
    db.query('INSERT INTO `ali_cate` SET ?' , {
        cate_name: body.name,
        cate_slug: body.slug
    } , (err, ret) =>{
        
        if(err){
            return next(err)
        }
        res.send({
            success:true,
            data: ret
        })
    })  
})

router.get('/categories/query' ,(req, res, next) =>{
    const { id } = req.query
    db.query('SELECT *FROM `ali_cate` WHERE `cate_id`=?', [id],(err,ret) =>{
        if(err){
            return next(err)
        }
        res.send({
            success:true,
            data: ret[0]
        })
    })

})

router.post('/categories/alter' ,(req ,res, next) =>{
    const body =req.body
    db.query('UPDATE `ali_cate` SET `cate_name`=?, `cate_slug`=? WHERE `cate_id`=?', 
    [body.cate_name, body.cate_slug, body.cate_id],
    (err,ret)=>{
       if(err){
        return next(err)
       }
       res.send({
           success:true,
           data: ret
       })
    })

})

 router.get('/comments', (req, res, next) =>{
    db.query('SELECT *FROM `ali_comment`' ,(err, ret) =>{
       if(err){
        return next(err)
       }
       res.send({
         success: true,
         data: ret
       })
    })
})

router.get('/comments/delete' ,(req, res, next) =>{
    const { id } = req.query
    db.query('DELETE FROM `ali_comment` WHERE `cmt_id`=?' ,[id],(err, ret) =>{
        if(err){
            return next(err)
        }
        res.send({
            success:true
            
        })
    })
})

 


module.exports = router
