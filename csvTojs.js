// 使用 Stream
const csv = require('csv');
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

readAndParseCSV();

async function readAndParseCSV() {
  try {
    // STEP 1: 讀取 CSV 檔
    const inputFilePath = path.resolve(__dirname, './translate.csv');
    const input = await fsPromises.readFile(inputFilePath);

    // STEP 2：建立讀出 CSV 用的陣列和 parser
    const output = [];
    const parser = csv.parse({
      delimiter: ',',
    });

    // STEP 3-1：建立對應事件 - 讀取資料
    parser.on('readable', function () {
      let record;
      while ((record = parser.read())) {
        // console.log(record)
        fs.appendFileSync('./test.txt', `${record[0]}: '${record[2]}',\n`)
        output.push(record[0], record[2]);
      }
    });

    // STEP 3-2：錯誤處理
    parser.on('error', function (err) {
      console.error(err.message);
    });

    // STEP 3-3：取得最後 output 的結果
    parser.on('end', function () {
      console.log('output', output);
    });

    // STEP 4：放入預備讀取的內容
    parser.write(input);

    // STEP 5：關閉 readable stream
    parser.end();
  } catch (error) {
    console.log('error', error);
  }
}