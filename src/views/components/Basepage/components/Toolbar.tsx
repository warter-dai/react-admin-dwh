import { Button } from "antd";
import type { JSX } from "react";

export type ToolbarProps = {
  children?: JSX.Element;
  onAddRow: () => void;
  onExport: () => void;
};

function Toolbar(props: ToolbarProps) {
  const onAddRow = () => {
    props.onAddRow();
  };

  const onExport = () => {
    props.onExport();
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "center",

        padding: "0px 10px",
      }}
    >
      {props.children}

      <Button type="primary" size="small" onClick={onAddRow}>
        新增
      </Button>
      <Button size="small" onClick={onExport}>
        导出
      </Button>
    </div>
  );
}

export default Toolbar;
