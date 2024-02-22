/**
 * @ Author: ZhengHui
 * @ Create Time: 2024-02-21 15:22:40
 * @ Modified by: ZhengHui
 * @ Modified time: 2024-02-22 10:16:38
 * @ Description: 分页
 */

import { useState, useEffect } from "react";

type PaginatedData<T> = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  data: T[];
};

type UsePaginationOptions = {
  initialPage?: number;
  pageSize?: number;
};

function usePagination<T>(data: T[], options: UsePaginationOptions = {}) {
  const { initialPage = 1, pageSize = 10 } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data.length / pageSize)
  );
  const [paginationData, setPaginationData] = useState<PaginatedData<T>>({
    currentPage,
    totalPages,
    pageSize,
    totalItems: data.length,
    data: data.slice(0, pageSize),
  });

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, data.length - 1);
    const currentPageData = data.slice(startIndex, endIndex + 1);
    setPaginationData({
      currentPage,
      totalPages,
      pageSize,
      totalItems: data.length,
      data: currentPageData,
    });
    setTotalPages(Math.ceil(data.length / pageSize));
  }, [currentPage, data, pageSize, totalPages]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages,
    pageSize,
    totalItems: paginationData.totalItems,
    data: paginationData.data,
    goToPage,
  };
}

export default usePagination;
