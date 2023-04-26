/**
  將函式設置為防抖函式，以防止在短時間內重複執行函式。
  @param {Function} func - 要執行的函式。
  @param {number} delay - 防抖延遲的時間，單位為毫秒。
  @returns {Function} 一個新的函式，當觸發時將會在指定的延遲時間後執行。
*/
export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};
