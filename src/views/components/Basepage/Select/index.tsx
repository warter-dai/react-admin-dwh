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

  const { valueField, labelField, ...resProps } = props;

  const onLoadData = async () => {
    const data = await loadData(props.url);
    const list = data.list as any[];
    setOptions(
      list.map((item) => {
        return {
          label: item[labelField || "value"],
          value: item[valueField || "label"],
        };
      })
    );
  };

  useEffect(() => {
    onLoadData();
  }, [props.url]);

  return (
    <Select ref={ref} {...resProps} options={options || props.options}>
      {props.children}
    </Select>
  );
});

export default ScmSelect;
