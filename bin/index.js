const { exec } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); // body-parser 解析json格式数据
app.use(bodyParser.urlencoded({ // 此项必须在 bodyParser.json 下面,为参数编码
  extended: true,
}));

let finishFlag = null;
let errorMsg = '';
let logs = [];
app.post('/start', (req, res) => {
  const requestData = req.body;
  const { ref } = requestData;
  if (finishFlag === false) {
    console.log(`正在发布，请稍后再试————————${new Date().toString()}`);
    res.json({
      success: false,
      publishing: true,
    });
    return;
  }
  if (ref === 'refs/heads/master') {
    logs = [];
    finishFlag = false;
    res.json({
      msg: '开始发布',
      success: true,
    });

    console.log(`开始发布————————${new Date().toString()}`);
    logs.push(`#开始打包发布，请等待。。。${new Date().toString()}`);
    exec('cd ../ && git pull && npm run build', {}, (error, std) => {
      if (error) {
        console.error(error);

        errorMsg = error.toString();
        finishFlag = true;
        return;
      }
      logs.push(std.toString());
      finishFlag = true;
    });
  }
});


app.get('/progress', (req, res) => {
  if (finishFlag === true) {
    if (errorMsg) {
      logs.push(`X发布失败————————${new Date().toString()}`);
      logs.push(`X${errorMsg}`);
      res.json({
        msg: '发布失败',
        logs,
        done: true,
        success: false,
      });
    } else {
      logs.push(`#发布成功————————${new Date().toString()}`);
      res.json({
        msg: '发布成功',
        logs,
        done: true,
        success: true,
      });
    }
    finishFlag = null;
    logs = [];
    errorMsg = '';
    return;
  } else if (finishFlag === null) {
    res.json({
      msg: '无执行内容',
      logs: [],
      success: true,
    });
    return;
  }
  logs.push(`发布中，请等待。。。${new Date().toString()}`);
  res.json({
    msg: '发布中',
    logs,
    done: false,
    success: true,
  });
});
app.get('/clearLogs', (req, res) => {
  logs = [];
  res.json({
    success: true,
  });
});
app.get('/', (req, res) => {
  res.sendfile('./index.html');
});

app.listen(3000, () => {
  console.log('发布程序在端口3000 启动!');
});
