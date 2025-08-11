import { useSleep } from "@/hooks/useSleep";
import { useEffect, useRef } from "react";

export type UseTabsContentProps = {
  sleepSpan: number;
  activeKey: string;
};

function useTabsContent({ sleepSpan, activeKey }: UseTabsContentProps) {
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const activeKeyRef = useRef(activeKey);
  const { sleep, clearSleep } = useSleep();
  const scrollSpan = 200;

  useEffect(() => {
    const container = tabScrollRef.current;
    if (!container) return;
    // ResizeObserver监听容器尺寸变化
    const resizeObserver = new ResizeObserver(() => {
      scrollToActiveIntoView();
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    // 更新当前选中tab
    activeKeyRef.current = activeKey;
    scrollToActiveIntoView();
  }, [activeKey]);

  const scrollLeft = () => {
    const container = tabScrollRef!.current!;
    container.scrollBy({ left: scrollSpan, behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = tabScrollRef!.current!;
    container.scrollBy({ left: -scrollSpan, behavior: "smooth" });
  };

  // 滚动到活动标签
  const scrollToActiveIntoView = async () => {
    const container = tabScrollRef.current;
    if (!container || !activeKeyRef.current) return;
    // 取消上次未完成的任务
    clearSleep();
    // 设定定时器，等待DOM更新完成
    await sleep(sleepSpan);
    requestAnimationFrame(() => {
      const run = async () => {
        const targetTab = container.querySelector(
          `div[data-tab-key="${activeKeyRef.current}"]`
        ) as HTMLElement | null;
        if (targetTab) {
          targetTab.scrollIntoView({
            behavior: "smooth",
            inline: "nearest",
          });

          await sleep(sleepSpan);
        }
      };
      run();
    });
  };

  return {
    tabScrollRef,
    scrollToActiveIntoView,
    activeKey,
    scrollLeft,
    scrollRight,
  };
}

export default useTabsContent;
