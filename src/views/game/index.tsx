import { useEffect, useMemo, useRef, useState } from "react";
import { configOpt } from "./config";
import { useSleep } from "@/hooks/useSleep";
import styles from "./index.module.css";
import { Button } from "antd";

const cloneDeepWith = (value: any) => {
  return JSON.parse(JSON.stringify(value));
};

const Game = () => {
  const [config] = useState(cloneDeepWith(configOpt));
  const { sleep, clearSleep } = useSleep();

  const [gameStatus, setGameStatus] = useState<
    "start" | "stop" | "default" | "gameOver"
  >("default");

  /** 得分 */
  const [score, setScore] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  let scoreMap = 0;

  /** 等级 */
  const level = useMemo(() => {
    if (score <= 1000) {
      return 0;
    }
    return Math.ceil((score - 1000) / 200);
  }, [score]);
  /** 速度 */
  const speed = useMemo(() => {
    let val = 60 - Math.floor(level / 4);
    if (val <= 3) {
      val = 3;
    }
    return val * 16.7;
  }, [level]);

  const defaultLeft = useMemo(() => {
    const width = config.width / config.defaultSize;
    return Math.floor(width * 0.5);
  }, [config.width, config.defaultSize]);

  const maxWidth = useMemo(() => {
    return config.width / config.defaultSize - 1;
  }, [config.width, config.defaultSize]);

  const maxHeight = useMemo(() => {
    return config.height / config.defaultSize - 1;
  }, [config.height, config.defaultSize]);

  const context2D = useRef<CanvasRenderingContext2D>(null);

  //   const context2D = useMemo(() => {
  // return canvasRef.current?.getContext("2d");
  //   }, [canvasRef.current]);

  useEffect(() => {
    context2D.current = canvasRef.current!.getContext("2d");
    document.removeEventListener("keydown", onKeyDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [canvasRef, gameStatus]);

  useEffect(() => {
    run();
  }, [gameStatus]);

  const run = async () => {
    clearSleep();
    while (
      gameStatus != "default" &&
      gameStatus !== "gameOver" &&
      gameStatus !== "stop"
    ) {
      if (config.workComponent.items.length === 0) {
        onAddView();
      }
      try {
        await sleep(speed);
      } catch (err) {
        console.log(err);
      } finally {
        // console.log('ok')
      }

      if (isCanDow()) {
        onDown();
        continue;
      }
      // 添加到已激活点
      addPoints();
      // 标记需要清除的点
      const rows = initFullRows();

      if (rows.length > 0) {
        scoreMap += 100 * Math.pow(2, rows.length - 1);
        setScore(scoreMap);
        drawClearView(rows);
        try {
          await sleep(speed);
        } catch (err) {
          console.log(err);
        } finally {
          // console.log('ok')
        }
        clearPoint();
        lowerLines(rows);
      }

      // 绘图
      drawView();
      // 重新生成新组件
      onAddView();
    }
  };

  /**
   * 判断是否出现重叠
   * @param component
   * @param pointX x坐标
   * @param pointY y坐标
   */
  const isCollision = (component: any, pointX: any, pointY: any) => {
    const items = component.items as Array<any>;
    const points = config.points as Array<any>;

    // 判断组件在当前坐标下是否存在重叠区域
    return items.some((item) => {
      const flag = points.findIndex((point) => {
        const status =
          point.x === (item.x + pointX) * config.defaultSize &&
          point.y === (item.y + pointY) * config.defaultSize;
        return status;
      });

      return flag >= 0;
    });
  };

  /**
   * 判断是否在视图内
   * @param component
   * @param pointX
   * @param pointY
   */
  const isInView = (component: any, pointX: any, pointY: any) => {
    const items = component.items as Array<any>;

    return items.every((item) => {
      const left = pointX + item.x;
      const top = pointY + item.y;

      return left >= 0 && left <= maxWidth && top >= 0 && top <= maxHeight;
    });
  };

  /**
   * 绘制组件
   * @param component
   */
  const draw = (component: any) => {
    const items = component.items as Array<any>;
    const context = context2D;
    context.current!.fillStyle = component.color;
    context.current!.strokeStyle = "green";

    items.forEach((item) => {
      context.current?.strokeRect(
        (component.left + item.x) * config.defaultSize,
        (component.top + item.y) * config.defaultSize,
        config.defaultSize,
        config.defaultSize
      );
      context.current?.fillRect(
        (component.left + item.x) * config.defaultSize,
        (component.top + item.y) * config.defaultSize,
        config.defaultSize,
        config.defaultSize
      );
    });
  };

  /**
   * 绘制已激活点
   */
  const drawPoint = () => {
    const items = config.points as Array<any>;
    const context = context2D;
    context.current!.fillStyle = "#ccc";
    context.current!.strokeStyle = "green";

    items.forEach((item) => {
      context.current!.fillStyle = item.color;
      context.current?.strokeRect(
        item.x,
        item.y,
        config.defaultSize,
        config.defaultSize
      );
      context.current?.fillRect(
        item.x,
        item.y,
        config.defaultSize,
        config.defaultSize
      );
    });
  };

  /**
   * 清除画布
   */
  const clearRect = () => {
    const context = context2D;
    context.current?.clearRect(0, 0, config.width, config.height);
  };

  /** 判断是否允许下降 */
  const isCanDow = () => {
    const flag = isInView(
      config.workComponent,
      config.workComponent.left,
      config.workComponent.top + 1
    );
    if (!flag) return false;
    const status = isCollision(
      config.workComponent,

      config.workComponent.left,
      config.workComponent.top + 1
    );
    if (status) return false;
    return true;
  };

  /** 随机生成图形组件 */
  const createView = () => {
    const randomNumber = Math.floor(Math.random() * config.components.length);
    const component = cloneDeepWith(config.components[randomNumber]) as any;
    //
    const componentIndex = Math.floor(Math.random() * component.childs.length);
    component.items = cloneDeepWith(component.childs[componentIndex].items);
    component.index = componentIndex;
    component.color =
      config.colors[Math.floor(Math.random() * config.colors.length)];
    const status = isCollision(
      component,
      defaultLeft - Math.floor(component.width * 0.5),
      0
    );

    if (status) return;

    return component;
  };

  /** 标记满行 */
  const initFullRows = () => {
    const points = config.points as Array<any>;

    const fullRows: number[] = [];

    for (let i = 0; i <= maxHeight; i++) {
      const items = points.filter((item) => {
        return item.y / config.defaultSize === i;
      });

      if (items.length === maxWidth + 1) {
        fullRows.push(i);

        items.forEach((item) => {
          item.isClear = true;
        });
      }
    }

    return fullRows;
  };

  /** 清除满行记录 */
  const clearPoint = async () => {
    const items = config.points as Array<any>;

    config.points = items.filter((item) => {
      return !item.isClear;
    }) as any;
  };

  /**
   * 指定行开始所有激活点Y轴下降一格
   * @param startIndex
   */
  const lowerLine = (startIndex: number) => {
    const points = config.points as Array<any>;
    points.forEach((item) => {
      //判断当前激活点是否在消除行上面
      if (item.y / config.defaultSize < startIndex) {
        // 下降一格
        item.y += config.defaultSize;
      }
    });
  };

  const lowerLines = (rowIndexs: Array<number>) => {
    rowIndexs.forEach((index) => {
      lowerLine(index);
    });
  };

  /** 清除行效果 */
  const drawClearView = (rows: Array<number>) => {
    const context = context2D;
    context.current!.globalAlpha = 0.5;
    context.current!.fillStyle = "red";

    rows.forEach((row) => {
      context.current?.fillRect(
        0,
        row * config.defaultSize,
        config.defaultSize * (maxWidth + 1),
        config.defaultSize
      );
    });
    context.current!.globalAlpha = 1;
  };

  const onStart = async () => {
    if (gameStatus === "start") return;
    setGameStatus("start");
  };

  /** 绘制组件 */
  const drawView = () => {
    const context = context2D;
    context.current?.save();
    clearRect();

    draw(config.workComponent);
    drawPoint();
    context.current?.restore();
  };

  const addPoints = () => {
    if (config.workComponent.items.length > 0) {
      const items = cloneDeepWith(config.workComponent.items) as Array<any>;
      const points = config.points as Array<any>;
      items.forEach((item) => {
        item.x = (config.workComponent.left + item.x) * config.defaultSize;
        item.y = (config.workComponent.top + item.y) * config.defaultSize;
        item.color = config.workComponent.color;

        points.push(cloneDeepWith(item));
      });
    }
  };

  const onRotate = () => {
    const component = cloneDeepWith(config.workComponent);

    component.index += 1;
    if (component.index >= component.childs.length) {
      component.index = 0;
    }
    const child = component.childs[component.index] as any;
    component.items = cloneDeepWith(child.items);
    const status = isCollision(component, component.left, component.top);
    if (status) return;
    const flag = isInView(component, component.left, component.top);
    if (!flag) return;
    config.workComponent = component;

    drawView();
  };

  const onNewGame = async () => {
    setGameStatus("default");
    config.points = [];
    config.workComponent.items = [];
    setScore(0);

    drawView();
    clearSleep();
    onStart();
  };

  const onStop = () => {
    setGameStatus("stop");
  };

  const onAddView = () => {
    const component = createView();
    if (!component) {
      setGameStatus("gameOver");
      setScore(0);
      return;
    }
    scoreMap += 10;
    setScore(scoreMap);

    config.workComponent = component as any;
    config.workComponent.left =
      defaultLeft - Math.floor(config.workComponent.width * 0.5);
    config.workComponent.top = 0;

    drawView();
  };

  const onDown = () => {
    const flag = isInView(
      config.workComponent,
      config.workComponent.left,
      config.workComponent.top + 1
    );
    if (!flag) return;
    const status = isCollision(
      config.workComponent,

      config.workComponent.left,
      config.workComponent.top + 1
    );
    if (status) return;
    config.workComponent.top += 1;
    drawView();
  };

  const onLeft = () => {
    const flag = isInView(
      config.workComponent,
      config.workComponent.left - 1,
      config.workComponent.top
    );
    if (!flag) return;
    const status = isCollision(
      config.workComponent,

      config.workComponent.left - 1,
      config.workComponent.top
    );
    if (status) return;
    config.workComponent.left -= 1;
    drawView();
  };

  const onRight = () => {
    const flag = isInView(
      config.workComponent,
      config.workComponent.left + 1,
      config.workComponent.top
    );
    if (!flag) return;
    const status = isCollision(
      config.workComponent,

      config.workComponent.left + 1,
      config.workComponent.top
    );
    if (status) return;
    config.workComponent.left += 1;
    drawView();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const key = e.code;
    if (gameStatus !== "start") return;

    switch (key) {
      case "Space":
        onRotate();
        break;
      case "ArrowRight":
        onRight();
        break;
      case "ArrowDown":
        onDown();
        break;
      case "ArrowLeft":
        onLeft();
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles["panel-main"]}>
      <div className={styles["views"]}>
        <div>
          <canvas
            className={styles["panel"]}
            width={config.width}
            height={config.height}
            ref={canvasRef}
          ></canvas>
        </div>
        <div className={styles["right"]}>
          <div className={styles["btns"]}>
            <Button
              onClick={onStart}
              size="small"
              type="primary"
              disabled={gameStatus === "start" || gameStatus === "gameOver"}
            >
              开始
            </Button>
            <Button
              onClick={onStop}
              size="small"
              type="primary"
              disabled={gameStatus === "stop" || gameStatus === "gameOver"}
            >
              暂停
            </Button>
            <Button onClick={onNewGame} size="small" type="primary">
              新游戏
            </Button>
          </div>
          <div>
            得分：{score} 等级：{level} 速度：{speed} <br />
            操作说明：键盘按键‘←’
            ‘→’分别控制左右移动，‘↓’控制加速向下移动，空格键控制变形
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
