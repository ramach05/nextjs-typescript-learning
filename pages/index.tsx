import styles from "../styles/stylesHome.module.scss";

import React from "react";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import MainContainer from "../components/MainContainer";

type TItem = {
  title: string;
  description: string;
};

type THomeProps = {
  dataItem: TItem[];
};

const Home = (props: THomeProps) => {
  const { dataItem } = props;

  const renderItems = (data: TItem[]) => {
    return data.map(({ title, description }) => (
      <a
        key={`${title}-${description}`}
        className={styles.card}
        href="https://nextjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>{title} &rarr;</h2>
        <p>{description}</p>
      </a>
    ));
  };

  return (
    <MainContainer>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <div className={styles.grid}>{renderItems(dataItem)}</div>

      <Link href="/users" passHref={true}>
        <a className={styles.link}>To users page</a>
      </Link>

      <Link href="/weather" passHref={true}>
        <a className={styles.link}>To weather page</a>
      </Link>
    </MainContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const dataItem: TItem[] = [
    {
      title: "Documentation",
      description: "Find in-depth information about Next.js features and API.",
    },
    {
      title: "Learn",
      description: "Learn about Next.js in an interactive course with quizzes!",
    },
  ];

  return {
    props: { dataItem },
    // revalidate: 60,
  };
};

export default Home;
