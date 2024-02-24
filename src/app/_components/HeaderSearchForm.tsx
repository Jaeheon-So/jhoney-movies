"use client";

import React, { useState } from "react";
import styles from "./headerSearchForm.module.scss";
import { useRouter } from "next/navigation";

type Props = {
  searchParam: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const HeaderSearchForm = ({ searchParam, onChange }: Props) => {
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${searchParam}`);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <input value={searchParam} onChange={onChange} />
      </form>
    </div>
  );
};

export default HeaderSearchForm;
