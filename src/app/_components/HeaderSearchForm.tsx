"use client";

import React, { useState } from "react";
import styles from "./headerSearchForm.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdSearch } from "react-icons/io";

const HeaderSearchForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [searchParam, setSearchParam] = useState(params.get("q") as string);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${searchParam}`);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.formEl}>
        <div className={styles.svgWrapper}>
          <IoMdSearch />
        </div>
        <input
          value={searchParam}
          onChange={onChange}
          className={styles.inputEl}
          placeholder="Search for Movies, Series & more"
          autoFocus
        />
      </form>
    </div>
  );
};

export default HeaderSearchForm;