"use client";

import { WordCard } from "@/components";
import usePagination from "@/hook/usePagination";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Learn = (props: any) => {
  const [dictData, setData] = useState<any>([]);

  const getData = async () => {
    const res = await fetch(`http://localhost:3000/${props.params.id}.json`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res?.json();
  };

  useEffect(() => {
    if (props.params.id) {
      getData().then((data) => setData(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.params.id]);

  const { currentPage, totalPages, pageSize, totalItems, data, goToPage } =
    usePagination(dictData, {
      pageSize: 1,
    });

  console.log(data, "sampleData1");
  return (
    <div className="flex flex-row h-screen w-screen justify-center">
      {data.length ? (
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
                        <div key={v.sContent}>
                          <p>
                            {v.sContent}
                            <br />
                            {v.sCn}
                          </p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="h-[380px] p-2 border shadow-md rounded-sm mb-3 overflow-auto">
                {JSON.stringify(item?.content)}
              </div>
            </div>
          ))}

          {/* Render pagination controls */}
          <div className="text-sm">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              上一页
            </button>
            <span>
              {currentPage} / {totalPages}{" "}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
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
