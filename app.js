const express = require('express') //引入express 模块
const app = express()              //创建实例
const mysql = require('mysql')     //引入mysql 模块
const axios = require('axios')
// 创建数据库连接 填入数据库信息 
//填自己数据库的信息!!!!!!!!!!!
const conn = mysql.createConnection({
    user: 'root',          //用户名
    password: '!@#123456',	//密码
    host: '47.100.70.129',		//主机（默认都是local host）
    database: 'mall'       //数据库名
})
//app.js
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


// 开始爬数据
app.get('/select', (req, res) => {
    let sqlStr = "select * from commodity;"
    //执行mysql 语句
    conn.query(sqlStr, (error, results, fields) => {
        if (error) throw error;
        console.log('The solution is: ', results);
    })
    //成功后的页面显示
    res.send('插入成功')
})

app.get('/find', (req, res) => {
    let data = [];
    // axios.get('https://g.pconline.com.cn/best/bcpsapi/bcps-api/index/topics?pageNo=3&pageSize=100&auditAt=20220913135705').then(res => {
    //     data = res.data.data.topicList
    //     data.forEach(e => {
    //         setTimeout(() => {
    //             conn.query(`INSERT INTO commodity (sectionName,cover,goodCount,intro,firstTypeName,secondTypeId,seq,tagIds) VALUES ('${e.sectionName}', '${e.cover}', '${e.goodCount}', '${e.intro}', '${e.firstTypeName}', '${e.secondTypeId}', '${e.seq}', '${e.tagIds}')`, (error, results, fields) => {
    //                 if (error) throw error;
    //                 console.log('插入成功')
    //             })
    //         }, 1000);
    //     });
    // })
    res.send('正在查询数据')
})

// 测试连接
conn.connect(err => {
    console.log(err, '如果为null 就是连接成功');
})
// 开启服务器
app.listen(3000, () => {
    console.log('服务器在3000端口开启。。。。。');
})
