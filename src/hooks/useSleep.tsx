import { useRef } from "react";

export function useSleep() {
  const sleepList = useRef<NodeJS.Timeout[]>([]);
  const sleep = async (timeSpan: number) => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        // 清空当前定时器
        clearTimeout(timer);
        sleepList.current.splice(sleepList.current.indexOf(timer), 1);
        resolve(true);
      }, timeSpan);

      sleepList.current.push(timer);
    });
  };

  const clearSleep = () => {
    sleepList.current.forEach((item) => {
      // console.log("清空定时器");
      clearTimeout(item);
    });
    sleepList.current = [];
  };

  return {
    sleep,
    clearSleep,
  };
}
