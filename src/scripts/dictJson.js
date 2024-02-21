const fs = require('fs');


// 请将文件路径替换为实际的文件路径
// 从命令行参数中获取文件路径
const inputFilePath = process.argv[2];

fs.readFile(inputFilePath, 'utf-8', (err, data) => {
  console.time('dict')
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.split('\n');
  let arr = [];
  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine) { // Check if the trimmed line is not empty
      try {
        const wordJson = JSON.parse(trimmedLine);
        arr.push(wordJson)
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  });

  const dictData = arr.sort((a, b) => a?.wordRank - b?.wordRank)
  fs.writeFileSync(inputFilePath, JSON.stringify(dictData));
  console.log('单词json格式转换完毕')
  console.timeEnd("dict")
});

