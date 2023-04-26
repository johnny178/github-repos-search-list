import { Dispatch, FC, SetStateAction, SyntheticEvent, memo, useRef } from "react";

import { debounce } from "utils/debounce";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  setSearchText: Dispatch<SetStateAction<string>>;
}

const SearchBar: FC<SearchBarProps> = ({ setSearchText }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  let compositionStatus = 'end';

  const debouncedSetSearchText = debounce((value: string) => {
    setSearchText(value);
  }, 500);

  const onInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    if (compositionStatus !== 'end') return;

    const value = e.currentTarget.value;

    debouncedSetSearchText(value);
  }

  const onCompositionChange =
    (status: string) =>
      (e: SyntheticEvent<HTMLInputElement>): void => {
        compositionStatus = status;
        onInputChange(e);
      };

  return (
    <div className={styles.inputContainer}>
      <input
        ref={inputRef}
        className={styles.input}
        onChange={onInputChange}
        onCompositionStart={onCompositionChange('start')}
        onCompositionEnd={onCompositionChange('end')}
        placeholder="Search"
      />
    </div>
  );
};

export default memo(SearchBar);
