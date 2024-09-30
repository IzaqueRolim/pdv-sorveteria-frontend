import React from 'react';

type ContainerProps = {
  title: string;
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ title, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Container;
