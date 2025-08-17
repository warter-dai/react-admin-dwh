import { useEffect, useState } from "react";

export type ChatRoomClientProps = {
  wsUrl: string;
  client: string;
  msgRef: React.RefObject<HTMLDivElement | null>;
};

const useChatRoomClient = ({ wsUrl, client, msgRef }: ChatRoomClientProps) => {
  const [messages, setMessage] = useState<any[]>([]);
  // 创建链接
  const webSoctet = new WebSocket(`${wsUrl}/${client}`);

  /** 加载历史历史聊天数据 */
  const initMessage = () => {
    const jsonStr = localStorage.getItem("clientData_" + client) || "[]";

    setMessage(messages.concat(JSON.parse(jsonStr)));
    scrollToBottom();
  };

  const scrollToBottom = () => {
    msgRef?.current!.scrollTo({
      top: msgRef.current!.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    initMessage();
  }, []);

  /** 加入聊天列表 */
  const addtMessage = (item: any) => {
    setMessage(messages.concat([item]));
    localStorage.setItem(
      "clientData_" + client,
      JSON.stringify(messages.concat([item]))
    );
    scrollToBottom();
  };

  webSoctet.onmessage = (event) => {
    const jsonData = JSON.parse(event.data);

    addtMessage({
      userId: jsonData.to,
      name: jsonData.to,
      msg: jsonData.msg,
      isAdmin: false,
    });
  };

  /** 发送聊天数据 */
  const onSend = (to: string, sendMsg: string) => {
    const jsonData = { type: "txt", from: client, to: to, msg: sendMsg };

    addtMessage({
      userId: jsonData.from,
      name: jsonData.from,
      msg: sendMsg,
      isAdmin: true,
    });

    webSoctet.send(JSON.stringify(jsonData));
    scrollToBottom();
  };

  /** 清空聊天数据 */
  const onClear = () => {
    localStorage.setItem("clientData_" + client, "[]");
    setMessage([]);
    scrollToBottom();
  };

  return {
    onClear,
    onSend,
    messages,
    setMessage,
  };
};

export default useChatRoomClient;
