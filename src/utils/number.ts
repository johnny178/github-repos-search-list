const isValidNumber = (num: number): boolean => {
  if (typeof num !== "number" || isNaN(num) || num < 0) {
    return false;
  }
  return true;
};

/**
  將數字轉換成千分位格式，並加上k表示千位。
  @param {number} num - 要轉換的數字。
  @returns {string} 轉換後的千分位格式的數字，如果不是有效的數字則返回"0"。
*/
export const formatNumberToThousand = (num: number): string => {
  if (!isValidNumber(num)) {
    return "0";
  }

  const formattedNumber =
    num > 999 ? (num / 1000).toFixed(1) + "k" : num.toString();
  return formattedNumber;
};
