import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from 'antd';
import styles from './styles.module.scss';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <div className={styles.container}>
        <Button type="primary" danger={true}>
          Turn off
        </Button>
      </div>
    </>
  );
}
