const axios = require("axios");

const fs = require("fs");

const path = require("path");

const { generateService } = require("@umijs/openapi");

const {
  swaggerConfigs,
  host,
  serverPath,
  requestImportStatement,
} = require("./api.service.configs.cjs");

swaggerConfigs.forEach(async (config, index) => {
  const filePath = `./public/swagger-${config.projectName}.json`;
  const configFile = path.resolve(__dirname, filePath);
  try {
    const response = await axios.get(config.schemaPath);
    // 处理泛型对象
    let dataStr = JSON.stringify(response.data);
    dataStr = dataStr.replace(/«|»/g, "");
    dataStr = dataStr.replace(/Mapstring,/g, "Mapstring");
    response.data = JSON.parse(dataStr);
    writeJson({
      data: response.data,
      controllers: config.controllers || [],
      configFile,
      filePath,
      excludeControllers: config.excludeControllers || [],
    });
  } catch (err) {
    console.error(err);
  }

  try {
    await generateService({
      ...config,
      apiPrefix: config.apiPrefix,
      schemaPath: `${host}/swagger-${config.projectName}.json`,
      serversPath: serverPath,
      requestImportStatement: requestImportStatement,
    });
  } catch (err) {
    console.log(err);
  }
  // 自动生成导入文件
  if (index === swaggerConfigs.length - 1) {
    renderJsTpl();
  }
});

/**
 * 中划线转驼峰
 * @param {string} str
 * @returns
 */
function getFunName(str) {
  const arr = str.split("-");
  const resStr = arr.reduce(function (prev, cur) {
    const str = prev + cur.slice(0, 1).toUpperCase() + cur.slice(1);
    return str;
  });
  return resStr;
}

/**
 * 把远程swagger api返回结果按需过滤后写入到本地工程静态文件夹
 * @param {{ data:Array,controllers:string[],configFile:string,filePath:string,excludeControllers:string[]}} params
 */
function writeJson(
  params = {
    data: [],
    controllers: [],
    configFile: "",
    filePath: "",
    excludeControllers: [],
  }
) {
  const paths = params.data.paths;
  const tags = params.data.tags;

  // 排除
  if (params.excludeControllers && params.excludeControllers.length > 0) {
    const index = tags.findIndex((item) => {
      return params.excludeControllers.includes(item.name);
    });
    if (index >= 0) {
      tags.splice(index, 1);
    }
  }

  // 过滤tags
  if (params.controllers.length > 0) {
    const tagsMap = tags.filter((item) => {
      return params.controllers.includes(item.name);
    });
    params.data.tags = tagsMap;
  }

  const pathsMap = {};

  for (const pathKey in paths) {
    const path = paths[pathKey];

    const methods = path.post || path.get || path.delete || path.put;

    if (
      params.excludeControllers.length > 0 &&
      params.excludeControllers.includes(methods.tags[0])
    ) {
      delete paths[pathKey];
    }

    if (params.controllers.length === 0) {
      pathsMap[pathKey] = paths[pathKey];
    }

    for (const key in path) {
      const map = path[key];

      map.operationId = map.operationId.replace(/_\d*/, "");

      const responses = map.responses;
      const parameters = map.parameters;
      // 删除不必要的参数
      const index = parameters.findIndex((item) => {
        return item.name === "Authorization";
      });
      if (index >= 0) {
        parameters.splice(index, 1);
      }
      // 过滤错误的返回参数
      map.responses = { 200: responses["200"] };
    }
  }

  // 过滤controller
  params.data.paths = pathsMap;
  // 过滤实体类
  if (params.excludeControllers.length > 0 || params.controllers.length > 0) {
    definitionsFilter(params.data);
  }

  try {
    fs.writeFileSync(params.configFile, JSON.stringify(params.data));
    console.log(`api.service: 已生成本地swagger文件【${params.filePath}】`);
  } catch (error) {
    console.log("api.service:error", error);
  }
}

/**
 *
 * @param {Record<string,any} properties
 * @param {any[]} definitionsFilter
 * @returns
 */
function propertiesFilter(properties, definitions) {
  let items = {};
  // 遍历所有属性，
  for (key in properties) {
    const property = properties[key];

    const $ref = property.$ref;

    if ($ref) {
      const refs = $ref.split("/");
      const refKey = refs[refs.length - 1];
      items[refKey] = definitions[refKey];
      if (items[refKey].type === "object") {
        const its = propertiesFilter(items[refKey].properties, definitions);
        items = { ...items, ...its };
      }
    }
  }
  return items;
}

function definitionsFilter(data = { paths: [], definitions: [] }) {
  let definitionsMap = {};
  for (const key in data.paths) {
    const path = data.paths[key];
    for (const key in path) {
      const methods = path[key];
      const parameters = methods.parameters;

      const responses200 = methods.responses[200];
      parameters.forEach((params) => {
        if (!params.schema) return;
        const ref = params.schema.$ref;
        if (!ref) return;
        const refs = ref.split("/");

        definitionsMap[refs[refs.length - 1]] =
          data.definitions[refs[refs.length - 1]];
      });
      if (!responses200.schema) return;
      const ref = responses200.schema.$ref;

      if (!ref) return;
      const refs = ref.split("/");
      definitionsMap[refs[refs.length - 1]] =
        data.definitions[refs[refs.length - 1]];
      // 过滤属性对象
      const props = propertiesFilter(
        data.definitions[refs[refs.length - 1]].properties,
        data.definitions
      );
      // 合并所有需要生成的实体对象
      definitionsMap = {
        ...definitionsMap,
        ...props,
      };
    }
  }

  data.definitions = definitionsMap;
}

// 导出模块
const jsModelTpl = `
export const api = {
  {tpl} 
}

export const apiModule = {
  {moduleTpl}
}
`;
// 导入模块
const jsImportTpl = `import {modelName} from '{path}'\n`;

/**
 * 获取模块名称
 * @returns 返回需要生成导出模块的目录
 */
function getModels() {
  const files = fs.readdirSync(serverPath);

  const dirNames = [];
  files.forEach((file) => {
    const stats = fs.lstatSync(`${serverPath}/${file}`);
    if (stats.isDirectory()) {
      const modelName = getFunName(file);
      if (
        dirNames.findIndex((dir) => {
          return dir.modelName === modelName;
        }) >= 0
      ) {
        return;
      }
      dirNames.push({ modelName, dir: file });
    }
  });

  return dirNames;
}

/**
 * 生成自动导入文件
 */
function renderJsTpl() {
  const tpls = [];

  const modelMaps = getModels();

  modelMaps.forEach((map) => {
    const jsImport = stringFormatBykey(jsImportTpl, {
      modelName: `${map.modelName}`,
      path: `./${map.dir}`,
    });

    tpls.push(jsImport);
  });

  const jsModel = stringFormatBykey(jsModelTpl, {
    tpl: `${modelMaps
      .map((item) => {
        return item.modelName;
      })
      .join(",\n  ")}`,
    moduleTpl: `...${modelMaps
      .map((item) => {
        return item.modelName;
      })
      .join(",\n  ...")}`,
  });

  tpls.push(jsModel);
  fs.writeFileSync(`${serverPath}/index.ts`, tpls.join(""));
}

/**
 * 格式字符串(键值对)
 * @param {string} str 模板
 * @param {Recoed<string,any>} keyMap 替换内容
 * @returns
 */
function stringFormatBykey(str, keyMap) {
  if (!keyMap) return str;
  for (const key in keyMap) {
    const re = new RegExp("\\{" + key + "\\}", "gm");
    str = str.replace(re, keyMap[key].toString());
  }
  return str;
}
