import { Button } from "antd";
import { useEffect, useRef } from "react";
import { Fragment } from "react/jsx-runtime";
import useVideoClient from "./useVideoClient";

function VideoCall() {
  const {
    onClose,
    onCancel,
    onConnected,
    onConnecting,
    videoRef,
    status,
    isOwner,
    webSocket,
    mediaSource,
    sourceBuffer,
    mimeCodec,
  } = useVideoClient({ userId: "admin", to: "client" });
  const mediaStream = useRef<MediaStream>(null);
  const mediaRecorder = useRef<MediaRecorder>(null);

  const videoTestRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 双方同意连接后开始发送视频信息
    if (status === "connected") {
      onPlay();
    }

    if (status === "close") {
      onCloseVideo();
    }
  }, [status]);

  const onCloseVideo = () => {
    videoRef.current?.pause();
    mediaRecorder.current?.stop();
    mediaStream.current?.getTracks().forEach((track) => {
      track.stop();
    });
  };

  const onPlay = async () => {
    mediaStream.current = await window.navigator.mediaDevices.getUserMedia({
      audio: true,
      // video: true,
      video: {
        width: 500,
        height: 500,
      },
    });

    mediaRecorder.current = new MediaRecorder(mediaStream.current, {
      mimeType: mimeCodec,
      // audioBitsPerSecond: 128000,
      // videoBitsPerSecond: 250000,
    });

    videoRef.current!.srcObject = mediaStream.current;
    videoRef.current!.onloadedmetadata = () => {
      if (mediaStream.current!.active) {
        videoRef.current?.play();
      }
    };

    mediaRecorder.current!.ondataavailable = function (event) {
      if (event.data.size > 0) {
        event.data.arrayBuffer().then((data) => {
          sourceBuffer.current!.appendBuffer(data);
          // 发送视频数据
          webSocket.current!.send(data);
        });
      }
    };
    mediaRecorder.current.start(25);
    videoTestRef.current!.src = URL.createObjectURL(mediaSource.current!);
  };

  return (
    <Fragment>
      <div style={{ display: "flex", gap: "5px" }}>
        <video
          width="500"
          height="500"
          ref={videoRef}
          autoPlay
          muted
          controls={true}
        ></video>
        <video
          width="500"
          height="500"
          ref={videoTestRef}
          autoPlay
          muted
          controls={true}
        ></video>
      </div>

      {status === "close" ? (
        <Button onClick={onConnecting} size="small" type="primary">
          发起通话
        </Button>
      ) : null}

      {status === "connecting" ? (
        <Button onClick={onCancel} size="small">
          取消
        </Button>
      ) : null}
      {status === "connecting" && !isOwner ? (
        <Button onClick={onConnected} size="small" type="primary">
          接听
        </Button>
      ) : null}

      {status === "connected" ? (
        <Button onClick={onClose} size="small" type="primary">
          结束通话
        </Button>
      ) : null}
    </Fragment>
  );
}

export default VideoCall;
