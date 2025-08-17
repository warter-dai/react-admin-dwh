const WebSocket = require("ws");
const webSocketServe = new WebSocket.Server({ port: 8089 });
// 连接池
const webSocketList = [];

const addConnectionUser = (ws, data) => {
  const connectionData = JSON.parse(data);
  const webSocketItem = webSocketList.find((item) => {
    return item.userId === connectionData.userId;
  });
  if (!webSocketItem) {
    webSocketList.push({
      userId: connectionData.userId,
      to: connectionData.to,
      webSocket: ws,
    });
    console.log(`用户【${connectionData.userId}】已连接`);
  } else {
    webSocketItem.webSocket = ws;
    webSocketItem.to = connectionData.to;
  }
};

const sendVideoData = (ws, data) => {
  // 接收到客户端信息后转发数据到指定客户端
  const webSocketItem = webSocketList.find((item) => {
    return item.webSocket === ws;
  });

  if (!webSocketItem) return;

  const webSocketTo = webSocketList.find((item) => {
    return item.userId === webSocketItem.to;
  });

  // 目标用户未连接
  if (!webSocketTo) {
    console.log(`${webSocketItem.to}用户未连接,信息转发失败`);
    return;
  }

  webSocketTo.webSocket.send(data);
};

webSocketServe.on("connection", function connection(ws) {
  ws.onmessage = (event) => {
    if (typeof event.data === "string") {
      const data = JSON.parse(event.data);
      if (data.action === "open") {
        addConnectionUser(ws, event.data);
        return;
      }
    }

    sendVideoData(ws, event.data);
  };

  ws.onclose = () => {
    const index = webSocketList.findIndex((item) => {
      return item.webSocket === ws;
    });
    if (index >= 0) {
      console.log(`【${webSocketList[index].userId}】已退出连接`);
      webSocketList.splice(index, 1);
    }

    ws.close();
  };
});
console.log("websocket: 服务启动成功");
