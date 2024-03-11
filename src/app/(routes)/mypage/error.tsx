"use client";

import styles from "@/app/_components/homeError.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.errorWrapper} style={{ marginTop: "100px" }}>
      <div className={styles.message}>{"관심 목록 불러오기 실패"}</div>
      <div className={styles.retry} onClick={() => reset()}>
        다시 시도
      </div>
    </div>
  );
}
