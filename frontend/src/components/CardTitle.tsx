import React from 'react';

interface CardTitleProps {
  title: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ title }) => {
  if (!title) return null;

  return (
    <span className="truncate block w-full" title={title}>
      {title}
    </span>
  );
};

export default CardTitle;
