var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'root',
  database : 'alishow'
});

// connection.connect();

// 直接导出对象
// 然后在外部加载db.js模块得到内部的连接对象connection
// 然后调用connection.query方法执行数据库操作

// connection.query('SELECT *FROM `ali_cate`', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });

// connection.end();

module.exports = pool