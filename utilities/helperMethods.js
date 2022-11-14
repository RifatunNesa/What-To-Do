const defaultPaginationData = {
  pageSize: 5,
  pageNumber: 1,
};

const minPageSize = 1;
const maxPageSize = 10;
const minPageNumber = 1;

exports.paginationHelper = (query) => {
  let { pageSize, pageNumber } = query;

  pageSize = parseInt(pageSize);
  pageNumber = parseInt(pageNumber);

  pageSize = !pageSize ? defaultPaginationData.pageSize : pageSize;
  pageNumber = !pageNumber ? defaultPaginationData.pageNumber : pageNumber;

  pageSize = pageSize < minPageSize ? minPageSize : pageSize;
  pageSize = pageSize > maxPageSize ? maxPageSize : pageSize;

  pageNumber = pageNumber < minPageNumber ? minPageNumber : pageNumber;

  return { pageSize, pageNumber };
};
