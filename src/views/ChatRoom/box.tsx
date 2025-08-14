import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./box.module.css";
import { Avatar, Button, Input } from "antd";
import useChatRoomClient from "./useChatRoomClient";

function Box() {
  const params = useParams();
  const msgRef = useRef<HTMLDivElement>(null);
  const [sendMsg, setSendMsg] = useState("");

  const { messages, onClear, onSend } = useChatRoomClient({
    wsUrl: "ws://localhost:8088",
    client: params.id!,
    msgRef: msgRef,
  });

  const onSendData = () => {
    onSend("admin", sendMsg);
    setSendMsg("");
  };

  return (
    <section className={styles["chatroom-panel"]}>
      <section className={styles["chatroom-msage-panel"]}>
        <section ref={msgRef} className={styles["msg"]}>
          {messages.map((item) => {
            return (
              <div
                key={item.userId}
                className={
                  styles["user-msg"] +
                  (item.isAdmin
                    ? "  " + styles["admin"]
                    : "  " + styles["client"])
                }
              >
                {item.isAdmin ? (
                  <div
                    className={styles["user-msg-content"]}
                    style={{ marginRight: "5px" }}
                  >
                    <div className={styles["content"]}> {item.msg}</div>
                    <div
                      className={styles["arrow"] + " " + styles["left"]}
                    ></div>
                  </div>
                ) : null}

                <Avatar
                  size={20}
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                />
                {!item.isAdmin ? (
                  <div
                    className={styles["user-msg-content"]}
                    style={{ marginRight: "5px" }}
                  >
                    <div
                      className={styles["arrow"] + " " + styles["right"]}
                    ></div>
                    <div className={styles["content"]}> {item.msg}</div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </section>
        <section className={styles["send"]}>
          <Input.TextArea
            rows={4}
            value={sendMsg}
            onChange={(e) => {
              setSendMsg(e.target.value);
            }}
            placeholder="Please input"
          />
        </section>
        <section className={styles["btns"]}>
          <Button onClick={onClear}>清除聊天数据</Button>
          <Button
            onClick={() => {
              onSendData();
            }}
            size="small"
            type="primary"
            disabled={!sendMsg}
          >
            发送
          </Button>
        </section>
      </section>
    </section>
  );
}

export default Box;
