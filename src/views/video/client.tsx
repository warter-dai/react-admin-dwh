import { Button } from "antd";
// import { useEffect, useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import useVideoClient from "./useVideoClient";

function VideoClient() {
  const {
    videoRef,
    status,
    isOwner,
    onCancel,
    onClose,
    onConnected,
    onConnecting,
  } = useVideoClient({
    userId: "client",
    to: "admin",
  });

  return (
    <Fragment>
      <video ref={videoRef} width="500" height="500" controls={true}></video>
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

export default VideoClient;
