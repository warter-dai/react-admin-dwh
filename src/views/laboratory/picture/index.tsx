import { useEffect, useRef, useState } from "react";
import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";

function Picture() {
  const itemsRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //   const [canvasSize, setCanvasSize] = useState({ width: 0, size: 0 });

  // 图层列表
  const [imagesList, setImagesList] = useState<Array<any>>([]);
  // 文件列表
  const [fileList] = useState<Array<any>>([]);
  // 当前选中图层
  const [selectItem, setSelectItem] = useState<any>();
  // 是否选中图层
  const isSelect = useRef(false);
  const cursor = useRef("");
  // 记录选中图层后初始坐标
  const startPoint = useRef({
    x: 0,
    y: 0,
  });

  const offset = 4;
  const fillRectSize = 4;
  // 图层初始大小
  const imageSize = 200;

  /**
   * 判断图层是否被选中
   * @param x 焦点位置 x
   * @param y 焦点位置 y
   * @param item 图层
   */
  const isSelectItem = (x: number, y: number, item: any) => {
    if (!item) return false;
    // 还原当前坐标
    const rotatedPoint = getTransform(
      x - item.left - item.width * 0.5,
      y - item.top - item.height * 0.5,
      -item.rotate
    );

    return (
      item.left <= item.left + rotatedPoint.x + item.width * 0.5 &&
      item.left + item.width >= item.left + rotatedPoint.x + item.width * 0.5 &&
      item.top <= item.top + rotatedPoint.y + item.height * 0.5 &&
      item.top + item.height >= item.top + rotatedPoint.y + item.height * 0.5
    );
  };

  /**
   * 根据焦点位置获取选中图层
   * @param event
   */
  const getSelectItem = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;
    const length = imagesList.length;

    let selectItem;

    for (let i = 0; i < length; i++) {
      const item = imagesList[i];

      if (isSelectItem(offsetX, offsetY, item)) {
        selectItem = item;
        break;
      }
    }

    return selectItem;
  };

  /**
   * 计算旋转后的坐标位置
   * @param x 旋转前X坐标（相对旋转中点）
   * @param y 旋转前Y坐标（相对旋转中点）
   * @param rotate 旋转角度
   */
  const getTransform = (x: number, y: number, rotate: number) => {
    //将角度化为弧度
    const angle = (Math.PI / 180) * rotate;
    const rotatedX = x * Math.cos(angle) - y * Math.sin(angle);
    const rotatedY = x * Math.sin(angle) + y * Math.cos(angle);

    return {
      x: rotatedX,
      y: rotatedY,
    };
  };

  /**
   * 初始化焦点在选中图层中显示状态
   * @param selectItem
   * @param event
   */
  const initCursor = (
    selectItem: any,
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!selectItem) {
      canvasRef.current!.style.cursor = "";
      return "";
    }

    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    const rotatedPoint = getTransform(
      offsetX - selectItem.left - selectItem.width * 0.5,
      offsetY - selectItem.top - selectItem.height * 0.5,
      -selectItem.rotate
    );

    const pointX = selectItem.left + selectItem.width;
    const pointY = selectItem.top + selectItem.height;
    const rotateOffsetX =
      selectItem.left + rotatedPoint.x + selectItem.width * 0.5;
    const rotateOffsetY =
      selectItem.top + rotatedPoint.y + selectItem.height * 0.5;

    if (
      rotateOffsetX >= pointX - 10 &&
      rotateOffsetX <= pointX &&
      rotateOffsetY >= pointY - 10 &&
      rotateOffsetY <= pointY
    ) {
      canvasRef.current!.style.cursor = "ne-resize";
      return "ne-resize";
    }

    if (!isSelect.current && isSelectItem(offsetX, offsetY, selectItem)) {
      canvasRef.current!.style.cursor = "pointer";
      return "pointer";
    }

    if (isSelect.current && isSelectItem(offsetX, offsetY, selectItem)) {
      canvasRef.current!.style.cursor = "move";
      return "move";
    }
    return "";
  };

  /**
   * 清除画布
   */
  const clearRect = () => {
    const width = canvasRef.current?.width || 0;
    const height = canvasRef.current?.height || 0;
    const left = 0;
    const top = 0;
    const context = canvasRef.current?.getContext("2d");

    context?.clearRect(
      left - 10,
      top - 10,
      width + offset * 2 + 10,
      height + offset * 2 + 10
    );
  };

  // 画图
  const drawImage = (item: any) => {
    const context = canvasRef.current?.getContext("2d");
    context?.save();
    // 计算旋转中心点
    const centerX = item.left + item.width / 2;
    const centerY = item.top + item.height / 2;
    // 变更原点至图片的中点
    context?.translate(centerX, centerY);
    //根据transform的旋转角度旋转坐标轴
    context?.rotate((item.rotate * Math.PI) / 180);
    //变更回来
    context?.translate(-centerX, -centerY);

    context!.font = "10px";
    context?.fillText(
      `left:${item.left} top:${item.top} width:${item.width} height:${item.height}`,
      item.left,
      item.top
    );

    context!.strokeStyle = "green";
    context?.strokeRect(
      item.left + offset * 0.5,
      item.top + offset * 0.5,
      Number(item.width.toFixed(0)) + offset,
      Number(item.height.toFixed(0)) + offset
    );

    context!.fillStyle = "green";
    context?.fillRect(item.left, item.top, fillRectSize, fillRectSize);
    context?.fillRect(
      item.left + (item.width + offset) * 0.5,
      item.top,
      fillRectSize,
      fillRectSize
    );
    context?.fillRect(
      item.left + item.width + offset,
      item.top,
      fillRectSize,
      fillRectSize
    );

    context?.fillRect(
      item.left,
      item.top + (item.height - offset) * 0.5,
      fillRectSize,
      fillRectSize
    );
    context?.fillRect(
      item.left + item.width + offset,
      item.top + (item.height - offset) * 0.5,
      fillRectSize,
      fillRectSize
    );

    context?.fillRect(
      item.left + (item.width + offset) * 0.5,
      item.top + item.height + offset,
      fillRectSize,
      fillRectSize
    );
    context?.fillRect(
      item.left,
      item.top + item.height + offset,
      fillRectSize,
      fillRectSize
    );
    context?.fillRect(
      item.left + item.width + offset,
      item.top + item.height + offset,
      fillRectSize,
      fillRectSize
    );

    context?.drawImage(
      item.img,
      item.left + offset,
      item.top + offset,
      Number(item.width.toFixed(0)),
      Number(item.height.toFixed(0))
    );

    context?.restore();
  };

  /**
   * 画图
   */
  const drawImageAll = () => {
    const length = imagesList.length;

    for (let i = length; i > 0; i--) {
      const item = imagesList[i - 1];
      drawImage(item);
    }
  };

  const setPoint = (
    item: any,
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    //计算位移
    const moveWidth = event.nativeEvent.offsetX - startPoint.current.x;
    const moveHeight = event.nativeEvent.offsetY - startPoint.current.y;
    item.top = item._top + moveHeight;
    item.left = item._left + moveWidth;
  };

  /** 点击图层 */
  const onMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const _selectItem = getSelectItem(event);

    if (_selectItem) {
      const nodes = itemsRef.current?.children;
      if (nodes && nodes.length > 0) {
        nodes[imagesList.indexOf(_selectItem)].scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
      isSelect.current = true;
      //记录起始位置
      startPoint.current.x = event.nativeEvent.offsetX;
      startPoint.current.y = event.nativeEvent.offsetY;

      // 记录原始坐标
      _selectItem._left = _selectItem.left;
      _selectItem._top = _selectItem.top;
      _selectItem._rotate = _selectItem.rotate;

      clearRect();
      drawImageAll();
      cursor.current = initCursor(_selectItem, event);
      setSelectItem(_selectItem);
    } else {
      isSelect.current = false;
    }
  };

  /** 鼠标松开事件 */
  const onMouseup = (event: any) => {
    isSelect.current = false;
    setSelectItem(null);
    const moveItem = getSelectItem(event);
    cursor.current = initCursor(moveItem, event);
  };

  /** 焦点移动 */
  const onMousemove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const moveItem = getSelectItem(event);
    // console.log(isSelect);
    if (!isSelect.current) {
      cursor.current = initCursor(moveItem, event);
      return;
    }

    if (cursor.current === "move") {
      //计算位移
      setPoint(selectItem, event);
    } else if (cursor.current === "ne-resize") {
      const { centerX, centerY } = selectItem as {
        centerY: number;
        centerX: number;
      };

      // 计算鼠标点击时所在弧度
      const angleBefore =
        (Math.atan2(
          startPoint.current.y - centerY - selectItem.top,
          startPoint.current.x - centerX - selectItem.left
        ) /
          Math.PI) *
        180;

      // 计算当前鼠标焦点弧度
      const angleAfter =
        (Math.atan2(
          event.nativeEvent.offsetY - centerY - selectItem.top,
          event.nativeEvent.offsetX - centerX - selectItem.left
        ) /
          Math.PI) *
        180;
      console.log(angleAfter - angleBefore);
      // 鼠标所在位置弧度 - 鼠标点击时弧度 = 实际移动弧度
      selectItem.rotate = selectItem._rotate + angleAfter - angleBefore;
    }
    requestAnimationFrame(() => {
      // 清除画布
      clearRect();
      drawImageAll();
    });
  };

  /** 图片选中 */
  const onUploadChange = (uploadFile: UploadChangeParam<UploadFile<any>>) => {
    const imageUrl = URL.createObjectURL(uploadFile.file.originFileObj as any);
    const img = new Image();
    img.src = imageUrl;

    // 新增图片初始位置
    const offsetTop = imagesList.length > 0 ? imagesList[0].top + 50 : 0;
    const offsetLeft = imagesList.length > 0 ? imagesList[0].left + 50 : 0;

    const item = {
      url: imageUrl,
      top: offsetTop,
      left: offsetLeft,
      width: 0,
      height: 0,
      scaling: 1,
      uid: uploadFile.file.uid,
      img: img,
      centerX: 0,
      centerY: 0,
      rotate: 0,
      _rotate: 0,
    };

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      if (width <= imageSize && width <= imageSize) {
        item.width = width;
        item.height = height;
        item.centerX = item.width * 0.5;
        item.centerY = item.height * 0.5;

        drawImage(item);
        return;
      }

      if (width > height) {
        item.scaling = imageSize / width;
        item.width = imageSize;
        item.height = height * item.scaling;
      } else {
        item.scaling = imageSize / height;
        item.height = imageSize;
        item.width = width * item.scaling;
      }
      item.centerX = item.width * 0.5;
      item.centerY = item.height * 0.5;
      drawImage(item);
    };

    setImagesList([item]);
  };

  useEffect(() => {
    canvasRef.current!.width = divRef.current!.offsetWidth || 0;
    canvasRef.current!.height = divRef.current!.offsetHeight - 2 || 0;
  }, [divRef.current]);

  return (
    <div className={styles["picture"]}>
      <div>
        支持图片拖拽，旋转 <br />
        长按图片拖拽 鼠标移动到图片右下角，出现旋转光标后可旋转
      </div>
      <div className={styles["panel"]}>
        <div className={styles["canvas-panel"]} ref={divRef}>
          <canvas
            ref={canvasRef}
            onMouseMove={(event) => {
              onMousemove(event);
            }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseup}
          ></canvas>
        </div>

        <div className={styles["image-list"]}>
          <div className={styles["items"]} ref={itemsRef}>
            {imagesList.map((image) => {
              return (
                <div className={styles["image-item"]} key={image.uid}>
                  {image.width ? (
                    <img
                      width={image.width}
                      height={image.height}
                      src={image.url}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className={styles["btn"]}>
            <Upload
              beforeUpload={() => {
                // return false;
              }}
              onChange={(e) => {
                onUploadChange(e);
              }}
              fileList={fileList}
              showUploadList={false}
              //   :auto-upload="false"
              multiple
            >
              <PlusOutlined />
            </Upload>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Picture;
