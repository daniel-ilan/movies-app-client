import React from 'react';
import InnerNav from '../shared/InnerNav';

const Subscriptions = () => {
  return (
    <>
      <InnerNav
        linkUrl='add-subscriber'
        linkText='Add Subscriber'
        homeText='All Subscriptions'
      />
      <h2>Subscriptions page!</h2>
    </>
  );
};

export default Subscriptions;
