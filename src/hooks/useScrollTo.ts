import { useState } from "react";

export interface ScrollToParams {
  element: HTMLElement;
  to: number;
  position: string;
  duration?: number;
  callback?: () => void;
}

const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};
const move = (element: HTMLElement, position: string, amount: number) => {
  const el = element as any;
  el[position] = amount;
};

export function useScrollTo({
  element,
  position = "scrollLeft",
  to,
  duration = 500,
  callback,
}: ScrollToParams) {
  const [isActive, setIsActive] = useState(false);

  const el = element as any;

  const start = el[position];
  const change = to - start;
  const increment = 20;
  let currentTime = 0;

  function animateScroll() {
    if (!isActive) {
      return;
    }
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, duration);

    move(el, position, val);
    if (currentTime < duration && isActive) {
      requestAnimationFrame(animateScroll);
    } else {
      if (callback) {
        callback();
      }
    }
  }

  function run() {
    setIsActive(true);

    animateScroll();
  }

  function stop() {
    setIsActive(false);
  }

  return { start: run, stop };
}
