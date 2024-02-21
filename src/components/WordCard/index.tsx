/**
 * @ Author: ZhengHui
 * @ Create Time: 2024-02-21 11:26:14
 * @ Modified by: ZhengHui
 * @ Modified time: 2024-02-21 11:31:04
 * @ Description:
 */

"use client";
import React, { useState, useEffect } from "react";

interface WordCardProps {
  words: string[];
  preloadCount?: number;
}

const WordCard: React.FC<WordCardProps> = ({ words, preloadCount = 1 }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [preloadedIndices, setPreloadedIndices] = useState<number[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const preloadWords = () => {
    const indicesToPreload: number[] = [];
    for (let i = 1; i <= preloadCount; i++) {
      const nextIndex = (currentIndex + i) % words.length;
      indicesToPreload.push(nextIndex);
    }
    setPreloadedIndices(indicesToPreload);
  };

  useEffect(() => {
    preloadWords();
  }, [currentIndex, words, preloadCount, preloadWords]);

  const nextWord = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  return (
    <div>
      <h1>Word Card</h1>
      <p>Current Word: {words[currentIndex]}</p>
      <button onClick={nextWord}>Next Word</button>

      <h2>Preloaded Words</h2>
      <ul>
        {preloadedIndices.map((index) => (
          <li key={index}>{words[index]}</li>
        ))}
      </ul>
    </div>
  );
};

export default WordCard;
