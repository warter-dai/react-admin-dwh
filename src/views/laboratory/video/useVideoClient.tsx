import { useEffect, useRef, useState } from "react";

export type UseVideoClientProps = {
  userId: string;
  to: string;
};

function useVideoClient({ userId, to }: UseVideoClientProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const webSocket = useRef<WebSocket>(null);
  // 连接状态
  const [status, setStatus] = useState<"connecting" | "connected" | "close">(
    "close"
  );

  const [isOwner, setIsOwner] = useState(false);

  const wsServer = "ws://localhost:8089";
  webSocket.current = new WebSocket(wsServer);
  webSocket.current.binaryType = "arraybuffer";
  webSocket.current.onopen = function () {
    const connectionData = {
      userId: userId,
      to: to,
      action: "open",
    };
    // 发送当前连接用户信息
    webSocket.current?.send(JSON.stringify(connectionData));
  };

  // 视频解码
  const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
  // 视频流容器
  const sourceBuffer = useRef<SourceBuffer>(null);
  const mediaSource = useRef<MediaSource>(new MediaSource());

  webSocket.current.onmessage = (event) => {
    if (typeof event.data === "string") {
      const data = JSON.parse(event.data);
      // 对方发球断开连接
      if (data.action === "close") {
        setIsOwner(false);
        setStatus("close");
      }
      // 对方发起连接请求
      if (data.action === "connecting") {
        setIsOwner(false);
        setStatus("connecting");
      }

      if (data.action === "connected") {
        setIsOwner(false);
        setStatus("connected");
      }
    } else {
      //   debugger;
      videos(event.data);
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;

    //创建视频播放源
    // mediaSource.current = new MediaSource();
    videoRef.current.src = URL.createObjectURL(mediaSource.current);
    // mediaSource.endOfStream();
    mediaSource.current.addEventListener("sourceopen", () => {
      sourceBuffer.current = mediaSource.current!.addSourceBuffer(mimeCodec);
    });

    videoRef.current!.onloadedmetadata = () => {
      videoRef.current!.play();
    };
  }, [videoRef]);

  const videos = (data: ArrayBuffer) => {
    // 追加接收的视频流信息到播放源

    sourceBuffer.current!.appendBuffer(data);
    console.log(data.byteLength / 8 / 1024);
  };

  const onConnecting = () => {
    // 发起申请连接信息
    const sendData = {
      userId: userId,
      to: to,
      action: "connecting",
    };
    webSocket.current?.send(JSON.stringify(sendData));
    setStatus("connecting");
    setIsOwner(true);
  };

  const onConnected = () => {
    // 发送同意连接信息
    const sendData = {
      userId: userId,
      to: to,
      action: "connected",
    };
    webSocket.current?.send(JSON.stringify(sendData));
    setStatus("connected");
    setIsOwner(true);
  };

  const onCancel = () => {
    // 取消连接
    const sendData = {
      userId: userId,
      to: to,
      action: "close",
    };
    webSocket.current?.send(JSON.stringify(sendData));
    setStatus("close");
    setIsOwner(true);
  };

  const onClose = () => {
    // 关闭连接，发送关闭请求
    const sendData = {
      userId: userId,
      to: to,
      action: "close",
    };
    webSocket.current?.send(JSON.stringify(sendData));
    setStatus("close");
    setIsOwner(true);
  };

  return {
    onCancel,
    onClose,
    onConnected,
    onConnecting,
    status,
    isOwner,
    videoRef,
    mimeCodec,
    webSocket,
    sourceBuffer,
    mediaSource,
  };
}

export default useVideoClient;
