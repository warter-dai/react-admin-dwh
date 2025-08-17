import { Avatar, Button, Card, Input } from "antd";
import { Fragment, useRef, useState } from "react";
import styles from "./index.module.css";
import useChatRoomClient from "./useChatRoomClient";

function ChatRoom() {
  const msgRef = useRef<HTMLDivElement>(null);
  const [sendMsg, setSendMsg] = useState("");

  const { messages, onClear, onSend } = useChatRoomClient({
    wsUrl: "ws://localhost:8088",
    client: "admin",
    msgRef: msgRef,
  });

  const [userData] = useState([
    { userId: "1", name: "test1" },
    { userId: "2", name: "test2" },
    { userId: "3", name: "test3" },
    { userId: "4", name: "test4" },
    { userId: "5", name: "test5" },
    { userId: "6", name: "test6" },
  ]);

  const [selectUser, setSelectUser] = useState<any>(userData[0].userId);

  const openTab = (item: any) => {
    setSelectUser(item);
  };

  const onSendData = () => {
    onSend(selectUser.userId, sendMsg);
    setSendMsg("");
  };

  return (
    <Fragment>
      <section className={styles["chatroom-panel"]}>
        <section className={styles["user-list"]}>
          {userData.map((item) => {
            return (
              <Card
                hoverable
                className={
                  styles["user-item"] +
                  " " +
                  (selectUser.userId === item.userId
                    ? styles["select-item"]
                    : "")
                }
                key={item.userId}
                onClick={() => {
                  openTab(item);
                }}
              >
                <Avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                <span className={styles["user-name"]}>{item.name}</span>
              </Card>
            );
          })}
        </section>

        <section className={styles["chatroom-msage-panel"]}>
          <section ref={msgRef} className={styles["msg"]}>
            {messages.map((item, i) => {
              return (
                <div
                  key={item.userId + i}
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

                  <Avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
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
              disabled={!selectUser || !sendMsg}
            >
              发送
            </Button>
          </section>
        </section>
      </section>
    </Fragment>
  );
}

export default ChatRoom;
