import React from "react";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.title}>
        About
        <div className={`${styles.detail}`}>
          <div className={styles.wrapper}>
            <p>
              이 사이트는{" "}
              <a
                href="https://developer.themoviedb.org/reference/intro/getting-started"
                target="_blank"
              >
                TMDB API
              </a>
              를 사용해서 만들었습니다. 트렌드, 최신, 예정 등의 컨텐츠를
              제공합니다. 영화, TV프로그램, 배우 등 원하는 정보를 찾아보세요.
            </p>
            <p>추가로 로그인하여 마음에 드는 영화를 저장해보세요.</p>
          </div>
        </div>
      </div>
      <div className={styles.title}>
        Contact
        <div className={`${styles.detail} ${styles.contact}`}>
          <div className={styles.wrapper}>
            <p>아래 이메일 주소로 연락주세요. 제 Github도 방문해주세요~</p>
            <p>
              이메일: thwogjs98@gmail.com
              <br />
              Github:{" "}
              <a href="https://github.com/Jaeheon-So" target="_blank">
                https://github.com/Jaeheon-So
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
