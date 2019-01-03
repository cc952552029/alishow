const express = require('express')
const router = express.Router()
const multer  = require('multer')
const path = require('path')
const crypto = require('crypto')
const db = require('../../utils/db') 
//告诉multer,吧接受到的文件目录存储到指定目录
// const upload = multer({ dest: 'uploads' })
router.prefix = '/api/posts'

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb){
    const extName = path.extname(file.originalname)
    const randomBytes = crypto.randomBytes(15).toString('hex')
    cb(null, `${randomBytes}-${Date.now()}${extName}`)
    }
})
const upload = multer({ storage:storage})

router.post('/add' ,upload.single('feature'), (req, res, next) =>{
  

const { body, file } = req
db.query('INSERT INTO `ali_article` SET ?',{

    article_title: body.title,
    article_body: body.content,
    article_adminid: req.session.user.admin_id,
    article_cateid: body.category,
    article_slug: body.slug,
    article_status: body.status,
    article_file:`/${file.destination}/${file.filename}`

} ,(err, ret) =>{
    if(err){
       return next(err)
    }


res.send({
   success:true,
   data:ret

})
})
})

module.exports = router