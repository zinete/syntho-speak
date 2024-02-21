/**
 * @ Author: ZhengHui
 * @ Create Time: 2024-02-21 10:12:25
 * @ Modified by: ZhengHui
 * @ Modified time: 2024-02-21 15:03:24
 * @ Description:
 */

"use client";

import IndexedDBUtils from "@/utils/IndexedDBUtils";
import { useEffect } from "react";

const indexedDBUtils = new IndexedDBUtils("dict", 1, "MyStore");

const Dashboard = () => {
  return <span>Dashboard</span>;
};

export default Dashboard;
