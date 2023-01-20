import glob from "fast-glob";
import { createFile, appenFile } from "./util/file.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function run() {
  const files = await glob("lang/**/*.ts");
  let res = "{\n";
  createFile(resolve("res.json"));
  __dirname;

  files.forEach((fileUrl) => {
    fs.readFile(fileUrl, "utf8", function (err, file) {
      res = getAssebleData(file);
      console.log(getAssebleData(file));
      appenFile("res.json", res);
    });
  });
}

function getAssebleData(fileData) {
  const keyValueReg = /([^\s]+):\s*[\'\"]([^]+)[\'\"].*/;

  let newData = "";

  let newLine = "";
  let line = "";

  const multiLineStartReg = /(.*):[\s\n\r]*$/;

  /**
   * 存储key,value在两行的情况， 如
   * 
   *     dianJiDaoRuHou:
        '点击“导入”后，系统将自动执行，请确认文件是否正确，确认后请点击导入。',
   */
  let multiLineStart = "";

  for (let i = 0; i < fileData.length; i++) {
    const item = fileData[i];

    if (item === "\n" || item === "\r") {
      /**
       * 处理两行的情况
       */
      if (multiLineStart) {
        line = multiLineStart + line;
        multiLineStart = "";
        newData += line + "\n";
      } else if (multiLineStartReg.test(line)) {
        multiLineStart = line;
      } else if (keyValueReg.test(line)) {
        newData += line + "\n";
      }

      line = "";
    } else {
      line += item;
    }
  }

  if (newLine) {
    newData += "    " + newLine + "\n";
  }

  console.log(newData);
  return newData;
}

function resolve(fakepath) {
  return path.resolve(__dirname, ".", fakepath);
}

run();
