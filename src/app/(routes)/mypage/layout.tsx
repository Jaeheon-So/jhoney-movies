import { auth } from "@/auth";
import React, { ReactNode } from "react";
import styles from "./layout.module.scss";
import LogoutBtn from "./_component/LogoutBtn";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getAllFavorList } from "@/lib/favor/getAllFavorList";
import FavorCount from "./_component/FavorCount";
import WithdrawBtn from "./_component/WithdrawBtn";
import NavBar from "./_component/NavBar";
import SortOption from "./_component/SortOption";

type Props = {
  children: ReactNode;
};

const MypageLayout = async ({ children }: Props) => {
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["auth", "favor", session?.user?.id || ""],
    queryFn: getAllFavorList,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.wrapper}>
            <div className={styles.imgWrapper}>
              <img
                src={
                  session?.user?.image
                    ? session?.user?.image
                    : "/default_profile.png"
                }
                alt="profile_img"
              />
            </div>
            <div className={styles.infoWrapper}>
              <div className={styles.name}>
                {session?.user?.image
                  ? session?.user?.name
                  : session?.user?.email}
              </div>
              <FavorCount session={session} />
            </div>
          </div>
          <div className={styles.btns}>
            <LogoutBtn />
            <WithdrawBtn session={session} />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.navWrapper}>
            <NavBar session={session} />
            <SortOption />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default MypageLayout;
