import useHttpMock from "@/utils/http/useHttpMock";
import { Select, type SelectProps } from "antd";
import { forwardRef, useEffect, useState } from "react";

export type ScmSelectProps = SelectProps & {
  url: string;
  valueField: string;
  labelField: string;
};

const ScmSelect = forwardRef((props: ScmSelectProps, ref?: any) => {
  const { loadData } = useHttpMock();

  const [options, setOptions] = useState<any[]>();

  const onLoadData = async () => {
    const data = await loadData(props.url);
    const list = data.list as any[];
    setOptions(
      list.map((item) => {
        return {
          label: item[props.labelField || "value"],
          value: item[props.valueField || "label"],
        };
      })
    );
  };

  useEffect(() => {
    onLoadData();
  }, [props.url]);

  return (
    <Select ref={ref} {...props} options={options || props.options}>
      {props.children}
    </Select>
  );
});

export default ScmSelect;
