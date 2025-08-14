const WebSocket = require("ws");
const webSocketServe = new WebSocket.Server({ port: 8088 });
// 连接池
const webSocketList = [];

// 未发送数据
let messageData = [];

webSocketServe.on("connection", function connection(ws, request) {
  // 获取连接信息
  const key = request.url.split("/")[1].split("?")[0];

  const webSocketConfig = webSocketList.find((item) => {
    return item.key === key;
  });
  if (!webSocketConfig) {
    webSocketList.push({
      url: request.url,
      key: key,
      webSocket: ws,
      request: request,
    });
    console.log(`用户【${key}】已连接`);
  } else {
    webSocketConfig.webSocket = ws;
    webSocketConfig.request = request;
  }
  // 用户重新连接时接收历史数据
  const messageDataList = [];
  // 遍历数据转发接收人
  for (let i = 0; i < messageData.length; i++) {
    let item = messageData[i];

    if (item.to === key) {
      // 找到连接池，直接发送数据
      console.log("转发历史消息:" + item.msg);
      // 发送数据，标记数据来源
      ws.send(JSON.stringify({ from: item.to, msg: item.msg }));
    } else {
      // 未找到连接，缓存数据
      messageDataList.push(item);
    }
  }

  messageData = messageDataList;

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // 接收到客户端信息后转发数据到指定客户端
    const webSocket = webSocketList.find((item) => {
      return item.key === data.to;
    });

    // 目标用户未连接
    if (!webSocket) {
      console.log(`${data.to}用户未连接,信息转发失败`);
      // 未发送信息缓存起来
      messageData.push({
        from: data.from,
        to: data.to,
        msg: data.msg,
      });
      return;
    }
    // 向目标用户发送信息
    console.log(data.from + "消息转发给:" + data.to + "内容：" + data.msg);
    webSocket.webSocket.send(JSON.stringify(data));
  };

  ws.onclose = () => {
    const index = webSocketList.findIndex((item) => {
      return item.key === key;
    });
    if (index >= 0) {
      webSocketList.splice(index, 1);
    }
    console.log(`【${key}】已退出连接`);
    ws.close();
  };
});
console.log("websocket: 服务启动成功");
