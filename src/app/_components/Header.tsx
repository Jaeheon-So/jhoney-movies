"use client";

import React, { useState } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import DropDown from "./DropDown";
import HeaderSearchForm from "./HeaderSearchForm";
import useScrollDirection from "../_hooks/useScrollDircetion";

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { isUp } = useScrollDirection();

  const onClickSearch = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <header className={`${styles.header} ${isUp && styles.up}`}>
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
            <li onClick={onClickSearch}>
              {showSearchBar ? <IoClose /> : <FaSearch />}
            </li>
          </ul>
        </div>
      </div>
      {showSearchBar && <HeaderSearchForm />}
    </header>
  );
};

export default Header;
