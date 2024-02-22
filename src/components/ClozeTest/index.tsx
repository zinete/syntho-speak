import React, { useCallback, useEffect, useState } from "react";

interface ClozeTestProps {
  text: string; // 整句
  blanks: string[]; //需要输入的单词
  onSubmission: (answers: Record<string, string>) => void;
}

// /[^\w\s]/g (过滤单词中的特殊字符)
const match = new RegExp(/[^\w\n\s]/g, "g");
const preprocessBlanks = (blanks: string[]): string[] => {
  return blanks.map((blank) => blank?.replace(match, "").toLowerCase());
};

const ClozeTest: React.FC<ClozeTestProps> = ({
  text,
  blanks,
  onSubmission,
}) => {
  const processedBlanks = preprocessBlanks(blanks);

  console.log(processedBlanks, "processedBlanks32");
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [validationResults, setValidationResults] = useState<
    Record<string, boolean>
  >(Object.fromEntries(processedBlanks.map((blank) => [blank, false])));

  // 验证全部答案是否正确
  const validateAllAnswers = () => {
    const userAnswerKeys = Object.keys(userAnswers).sort();
    const processedBlanksSorted = processedBlanks.sort();

    console.log(userAnswers, processedBlanks);
    const isCorrect =
      JSON.stringify(userAnswerKeys) === JSON.stringify(processedBlanksSorted);

    return isCorrect;
  };

  // 验证单个
  const validateAnswer = (blank: string, answer: string): boolean => {
    const processedBlank = blank.replace(match, "");

    // 对答案执行验证逻辑（例如，与正确答案进行比较）
    const isCorrect = answer === processedBlank;
    setValidationResults((prevResults) => ({
      ...prevResults,
      [processedBlank]: isCorrect,
    }));

    return isCorrect;
  };

  const handleInputChange = (blank: string, answer: string) => {
    const processedBlank = blank.replace(match, "");
    validateAnswer(blank, answer);
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [processedBlank]: answer,
    }));
  };

  const handleSubmit = () => {
    if (validateAllAnswers()) {
      onSubmission(userAnswers);
    } else {
    }
  };

  return (
    <div>
      <p className="break-all">
        {text?.split(" ").map((word, index) =>
          processedBlanks?.includes(word.replace(match, "")) ? (
            <span
              ref={spanRef}
              key={index}
              contentEditable
              suppressContentEditableWarning
              className={`bg-transparent border-b-2 ${
                validationResults[word.replace(match, "")]
                  ? "border-green-500 text-green-600 "
                  : "border-fuchsia-600 text-fuchsia-600 "
              } px-2 mx-1 outline-none text-center`}
              onInput={(e: any) => {
                handleInputChange(word, e.target?.innerText);
              }}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                  e.preventDefault();
                }
              }}
              onPaste={(e) => {
                e.preventDefault();
                const plainText = e.clipboardData.getData("text/plain");
                document.execCommand("insertText", false, plainText);
              }}
            >
              {/* {word} */}
            </span>
          ) : (
            <span className="mx-1" key={index}>
              {word}
            </span>
          )
        )}
      </p>
    </div>
  );
};

export default ClozeTest;
