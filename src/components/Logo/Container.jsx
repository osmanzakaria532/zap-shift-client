import React, { Children } from 'react';

const Container = ({ className, children }) => {
  return <div className={`max-w-[1220px] mx-auto ${className}`}>{children}</div>;
};

export default Container;
