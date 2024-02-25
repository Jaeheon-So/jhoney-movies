"use client";

import React, { useState } from "react";
import styles from "./homeSearchForm.module.scss";
import { useRouter } from "next/navigation";

const HomeSearchForm = () => {
  const router = useRouter();
  const [searchParam, setSearchParam] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${searchParam}`);
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <input
          value={searchParam}
          onChange={onChange}
          placeholder="Search for a movie, tv, person..."
        />
      </form>
    </div>
  );
};

export default HomeSearchForm;
