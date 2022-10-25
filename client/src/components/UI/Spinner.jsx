import React from "react";
import styles from "./Spinner.module.css";
export const Spinner = () => {
  return (
    <div className={styles["loadingSpinnerContainer"]}>
      <div className={styles["loadingSpinner"]}></div>
    </div>
  );
};
