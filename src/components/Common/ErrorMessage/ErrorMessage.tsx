import React, { FC, memo } from 'react'

import styles from './ErrorMessage.module.scss'

interface ErrorMessageProps {
  text: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => {
  return <span className={styles.error}>{text}</span>;
}

export default memo(ErrorMessage);