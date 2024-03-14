"use client";

import React, { Suspense, useState } from "react";
import styles from "./header.module.scss";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import DropDown from "./DropDown";
import HeaderSearchForm from "./HeaderSearchForm";
import useScrollDirection from "../../hooks/useScrollDircetion";
import { Session } from "next-auth";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";

type Props = {
  session: Session | null;
};

const Header = ({ session }: Props) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { isUp } = useScrollDirection();
  const pathname = usePathname();

  const onClickSearch = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <header className={`${styles.header} ${isUp && styles.up}`}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Link href="/">
              <span>HONEY-BOX</span>
            </Link>
          </div>
          <ul className={styles.leftul}>
            <li>
              <Link href="/movie?sort_by=popularity.desc">Movies</Link>
              <div className={styles.dropdown}>
                <DropDown type="movie" />
              </div>
            </li>
            <li>
              <Link href="/tv?sort_by=popularity.desc">TV Shows</Link>
              <div className={styles.dropdown}>
                <DropDown type="tv" />
              </div>
            </li>
            <li>
              <Link href="/people">People</Link>
              <div className={styles.dropdown}>
                <DropDown type="people" />
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
          <ul className={styles.rightul}>
            {session?.user ? (
              <li>
                <Link href="/mypage">Mypage</Link>
              </li>
            ) : (
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            )}
            {session?.user ? (
              <li>
                <LogoutButton />
              </li>
            ) : (
              <li>
                {pathname === "/login" ? (
                  <a style={{ cursor: "pointer" }}>Login</a>
                ) : (
                  <Link href={`/login?callbackUrl=${pathname}`}>Login</Link>
                )}
              </li>
            )}
            <li onClick={onClickSearch}>
              {showSearchBar ? <IoClose /> : <FaSearch />}
            </li>
          </ul>
        </div>
      </div>
      <Suspense>
        <HeaderSearchForm showSearchBar={showSearchBar} />
      </Suspense>
    </header>
  );
};

export default Header;
