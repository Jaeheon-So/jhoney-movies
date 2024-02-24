import React from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import DropDown from "./DropDown";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link href="/">
              <span>JHONEYDB</span>
            </Link>
          </div>
          <ul className={styles.leftul}>
            <li>
              <Link href="/movie">Movies</Link>
              <div className={styles.dropdown}>
                <DropDown type="movie" />
              </div>
            </li>
            <li>
              <Link href="/tv">TV Shows</Link>
              <div className={styles.dropdown}>
                <DropDown type="tv" />
              </div>
            </li>
            <li>
              <Link href="/person">People</Link>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          <ul className={styles.rightul}>
            <li>
              <Link href="/signup">Signup</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <FaSearch />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
{
  /* <li>
              <Link href="/">
                <span>//</span> Movie Search
              </Link>
            </li> */
}
