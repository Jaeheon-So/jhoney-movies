import React from "react";
import styles from "./dropdown.module.scss";
import Link from "next/link";

type Props = {
  type: string;
};

const DropDown = ({ type }: Props) => {
  return (
    <ul className={styles.dropdownul}>
      <li>
        <Link href={`/${type}`}>Popular</Link>
      </li>
      <li>
        <Link href={`/${type}/top-rated`}>Top Rated</Link>
      </li>
    </ul>
  );
};

export default DropDown;
