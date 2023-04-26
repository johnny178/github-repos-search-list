const isValidDate = (d: Date): boolean => {
  return !isNaN(d.getTime());
};

/**
  將日期格式轉換為月份名稱的縮寫加上日期和年份的格式。
  @param {string} input - 要轉換的日期格式字串。
  @returns {string} 轉換後的日期格式為月份名稱的縮寫加上日期和年份的格式，如果輸入不是有效的日期格式則返回空字串。
*/
export const formatDateWithMonthName = (input: string): string => {
  if (typeof input !== "string" || input.trim() === "") {
    return "";
  }

  const date = new Date(input);

  if (!isValidDate(date)) {
    return "";
  }

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
};
