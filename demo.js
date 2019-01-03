

var glob = require("glob")


// 获取routes目录下所有以.js结尾的文件
glob("./routes/**/*.js", function (err, files) {
    if(err){
        throw err
    }
    console.log(files)
})