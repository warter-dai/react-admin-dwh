import variables from "@/variables.module.less";

export const useDesign = () => {
  const lessVariables = variables;

  return {
    variables: lessVariables,
  };
};
