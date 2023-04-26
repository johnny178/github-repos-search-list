/**
  如果輸入的字串長度超過指定的長度，將其截斷並在末尾添加省略號。
  @param {string} input - 要截斷的字串。
  @param {number} length - 最大字串長度。
  @returns {string} 截斷後的字串，如果輸入的字串沒有超過指定的長度，則返回原始的字串。
*/
export const truncateString = (input: string, length: number): string =>
  input.length > length ? input.substring(0, length) + "..." : input;
