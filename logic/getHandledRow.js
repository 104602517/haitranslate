const { appenFile } = require("../util/file.js");
const { isSameValueInArr } = require("../util/arr");
const noMatchPath = "./noMatch.js";

function createEqualFns({
  handleInfo,
  preInfo,
  afterInfo,
  TRANSLATION_ORIGINN_DATA,
}) {
  const equalCur = (index) => {
    const curInfo = TRANSLATION_ORIGINN_DATA[index] || {};
    handleInfo = handleInfo || {};

    return curInfo.key === handleInfo.key;
  };

  const equalPre = (index) => {
    const curInfo = TRANSLATION_ORIGINN_DATA[index] || {};
    preInfo = preInfo || {};
    return curInfo.key === preInfo.key;
  };

  const equalAfter = (index) => {
    const curInfo = TRANSLATION_ORIGINN_DATA[index] || {};
    afterInfo = afterInfo || {};
    return curInfo.key === afterInfo.key;
  };

  return {
    equalCur,
    equalPre,
    equalAfter,
  };
}

module.exports = function getHandledRow({
  handleInfo,
  preInfo,
  afterInfo,
  line,
  fileName,
  TRANSLATION_ORIGINN_DATA,
}) {
  let newLine = null;
  let newInfo = null;
  let matchedResults = [];
  let preMatches = [];
  let afterMatches = [];
  let preAfterMatches = [];

  handleHasNewLineRow({ handleInfo, fileName, line });

  TRANSLATION_ORIGINN_DATA = [...TRANSLATION_ORIGINN_DATA];

  const { equalCur, equalPre, equalAfter } = createEqualFns({
    handleInfo,
    preInfo,
    afterInfo,
    TRANSLATION_ORIGINN_DATA,
  });

  matchedResults = TRANSLATION_ORIGINN_DATA.filter((translation, index) =>
    equalCur(index)
  );
  const matchedLength = matchedResults.length;
  const canUseMatchRes =
    matchedLength === 1 ||
    (matchedLength > 1 && isSameValueInArr(matchedResults));

  if (canUseMatchRes) {
    newInfo = matchedResults[0];
    return getNewLine({ newInfo, line, handleInfo });
  }

  if (matchedLength > 1) {
    preMatches = TRANSLATION_ORIGINN_DATA.filter(
      (translation, index) => equalCur(index) && equalPre(index - 1)
    );
    afterMatches = TRANSLATION_ORIGINN_DATA.filter(
      (translation, index) => equalCur(index) && equalAfter(index + 1)
    );
    preAfterMatches = TRANSLATION_ORIGINN_DATA.filter(
      (translation, index) =>
        equalCur(index) && equalPre(index - 1) && equalAfter(index + 1)
    );

    const canUsePreMatchRes =
      preMatches.length === 1 ||
      (preMatches.length > 1 && isSameValueInArr(preMatches));
    const canUseAfterMatchRes =
      preMatches.length === 1 ||
      (preMatches.length > 1 && isSameValueInArr(preAfterMatches));
    const canUsePreAfterMatchRes =
      preAfterMatches.length === 1 ||
      (preAfterMatches.length > 1 && isSameValueInArr(preAfterMatches));

    if (canUsePreMatchRes) {
      return getNewLine({ newInfo: preMatches[0], line, handleInfo });
    }

    if (canUseAfterMatchRes) {
      return getNewLine({ newInfo: afterMatches[0], line, handleInfo });
    }

    if (canUsePreAfterMatchRes) {
      return getNewLine({ newInfo: preAfterMatches[0], line, handleInfo });
    }

    appendToNoMatch({ noMatchPath, line, fileName });
  } else {
    appendToNoMatch({ noMatchPath, line, fileName });
  }

  return getNewLine({ newInfo, line, handleInfo });
};

function appendToNoMatch({ noMatchPath, line, fileName }) {
  // 如果找不到或者有多个写入到文件夹
  if (line) {
    appenFile(noMatchPath, line + " \\\\" + fileName + " \n  ");
  }
}

function getNewLine({ newInfo, line, handleInfo }) {
  let newLine = "";

  // 组合newLine
  if (newInfo) {
    const { value: handleInfoValue } = handleInfo;
    const { value: newInfoValue } = newInfo;
    const startNReg = /^\s*(\\n).*(\\n)*.*(\\n)*$/;
    const endNreg = /^\s*(\\n)*.*(\\n)*.*(\\n)\s*$/;

    const newInfoStartN = startNReg.test(newInfoValue);
    const newInfoEndN = endNreg.test(newInfoValue);
    const preStr =
      startNReg.test(handleInfoValue) && !newInfoStartN ? "\\n" : "";
    const endStr = endNreg.test(handleInfoValue) && !newInfoEndN ? "\\n" : "";

    if (newInfo && newInfo.key === "tiJiao") {
      console.log("0" + newInfoValue + "0");
    }

    newLine = `${newInfo.key}:  '${preStr}${newInfoValue}${endStr}', \n`;
  } else {
    newLine = line ? line + "\n" : " ";
  }

  return newLine;
}

function handleHasNewLineRow({ handleInfo, fileName, line }) {
  const hasNInMiddleReg = /^\s*(\\n)*.+(\\n).+(\\n)*$/;
  const { value } = handleInfo;

  if (hasNInMiddleReg.test(value.trim())) {
    appenFile("checkNewLine.js", line + " \\\\" + fileName + " \n  ");
  }
}
