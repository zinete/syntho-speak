"use client";

import { WordCard, ClozeTest } from "@/components";

import usePagination from "@/hook/usePagination";
import { Route } from "next";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

interface ILearnProps {
  params: {
    id: string;
  };
}
const Learn = (props: ILearnProps) => {
  const [dictData, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const localcurrentPage = localStorage.getItem("currentPage");

  // 保存进度
  const saveHistory = (page: string) => {
    localStorage.setItem("currentPage", page);
  };
  // 数据分页
  const { currentPage, totalPages, pageSize, totalItems, data, goToPage } =
    usePagination(dictData, {
      pageSize: 1,
    });

  // 上一页
  const prevPage = () => {
    goToPage(currentPage - 1);
    saveHistory(String(currentPage - 1));
  };
  // 下一页
  const nextPage = () => {
    goToPage(currentPage + 1);
    saveHistory(String(currentPage + 1));
  };

  const specializeWord = (word: string): string[] => {
    const result: string[] = [word];
    // 假设现在只考虑一些简单的单词转换规则
    if (word?.endsWith("ize")) {
      // 转换为 specialized 形式
      result.push(word.slice(0, -3) + "ized");
    }
    // 在这里可以添加其他转换规则
    return result;
  };

  console.log(specializeWord("specialize"), "specializeWord");
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await fetch(`/${props.params.id}.json`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return await res?.json();
    };
    if (props.params.id) {
      getData().then((data) => {
        setLoading(false);
        setData(data);
      });
    }
  }, [props.params.id]);

  useEffect(() => {
    if (localcurrentPage) {
      goToPage(Number(localcurrentPage));
    }
  }, [goToPage, localcurrentPage]);

  return (
    <div className="flex flex-row h-screen w-screen justify-center">
      {data.length && !loading ? (
        <div className="mt-10 w-[60%]">
          {/* Render your component using the paginated data */}
          {data.map((item: any) => (
            <div key={item.wordRank}>
              <div className="flex flex-row items-center">
                {item?.content?.word?.content?.picture ? (
                  <Image
                    src={item?.content?.word?.content?.picture}
                    className="mr-3"
                    alt={"图片"}
                    width={120}
                    height={120}
                  />
                ) : null}
                <div className="flex flex-col">
                  <h2 className="text-2xl font-mono font-semibold">
                    {item?.headWord}
                  </h2>
                  <div className="flex flex-row text-xs mt-2">
                    <p className="py-1 px-2 border rounded-full mr-2">
                      英/{item?.content?.word?.content?.ukphone}/
                    </p>
                    <p className="py-1 px-2 border rounded-full">
                      美/{item?.content?.word?.content?.usphone}/
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-4">
                <div className="text-sm">
                  {item?.content?.word?.content?.sentence?.sentences?.map(
                    (v: any) => {
                      return (
                        <div
                          key={v.sContent}
                          className="border-b-[1px] text-xl border-dashed border-green-400 pb-1 mb-4"
                        >
                          <div>
                            <ClozeTest
                              text={v.sContent}
                              blanks={specializeWord(v?.headWord)}
                              onSubmission={(e) => {
                                nextPage();
                              }}
                            />
                          </div>
                          <span>{v.sCn}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              {/* <div className="p-2 border shadow-md rounded-sm mb-3 overflow-auto">
                {JSON.stringify(item?.content)}
              </div> */}
            </div>
          ))}

          {/* Render pagination controls */}
          <div className="text-sm">
            <button
              onClick={() => {
                prevPage();
              }}
              disabled={currentPage === 1}
            >
              上一页
            </button>
            <span>
              {currentPage} / {totalPages}{" "}
            </span>
            <button
              onClick={() => {
                nextPage();
              }}
              disabled={currentPage === totalPages}
            >
              下一页
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Learn;
