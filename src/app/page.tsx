/**
 * @ Author: ZhengHui
 * @ Create Time: 2024-02-21 10:14:47
 * @ Modified by: ZhengHui
 * @ Modified time: 2024-02-21 16:46:21
 * @ Description:
 */

"use client";

import IndexedDBUtils from "@/utils/IndexedDBUtils";
import Link from "next/link";

const Home = () => {
  const dictBook = [
    {
      title: "四级真题核心词（图片记忆）",
      path: "CET4luan_1",
    },
    {
      title: "专四真题高频词",
      path: "Level4luan_1",
    },
    {
      title: "专八真题高频词",
      path: "Level8_1",
    },
    {
      title: "六级真题核心词（图片记忆)",
    },
    {
      title: "考研必考词汇",
    },
  ];
  return (
    <main className="h-screen flex flex-col p-24">
      <div className="fixed left-6 top-4 text-3xl font-extrabold text-purple-400">
        SynthoSpeak
      </div>
      <h2 className="text-xl mb-2 mt-6 text-center">
        Expand your vocabulary universe, unlock a vibrant life through words.
        Journey with our web application, effortlessly embrace the joy of
        learning, illuminate every context, and let English become the
        wellspring of inspiration in your life.
      </h2>
      <section className="mx-20">
        <div className="grid grid-cols-3 mt-10 gap-3 text-sm font-bold">
          {dictBook.map((i) =>
            i.path ? (
              <Link
                href={`/learn/${i.path}`}
                key={i.title}
                className="w-full cursor-pointer rounded-xl hover:bg-gray-900 transition-all flex justify-center items-center h-32 border"
              >
                {i.title}
              </Link>
            ) : (
              <div
                key={i.title}
                className="w-full cursor-pointer rounded-xl bg-slate-800 transition-all flex justify-center items-center h-32 border"
              >
                敬请期待
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
};
export default Home;
