"use client";

import React, { useState } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import DropDown from "./DropDown";
import HeaderSearchForm from "./HeaderSearchForm";

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchParam, setSearchParam] = useState("");

  const onClickSearch = () => {
    setShowSearchBar(!showSearchBar);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  };

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
            <li onClick={onClickSearch}>
              {showSearchBar ? <IoClose /> : <FaSearch />}
            </li>
          </ul>
        </div>
      </div>
      {showSearchBar && (
        <HeaderSearchForm searchParam={searchParam} onChange={onChange} />
      )}
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
