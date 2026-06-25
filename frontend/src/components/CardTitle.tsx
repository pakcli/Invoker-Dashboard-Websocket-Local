import React from 'react';

interface CardTitleProps {
  title: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ title }) => {
  if (!title) return null;

  // If the title is relatively short, don't force a middle split to keep it clean.
  if (title.length <= 12) {
    return <span className="truncate block">{title}</span>;
  }

  // We slice the last 8 characters (as requested to support "Plus Lab")
  const lastPart = title.slice(-8);
  const firstPart = title.slice(0, -8);

  return (
    <span className="flex items-center min-w-0 w-full">
      <span className="truncate min-w-0 shrink">{firstPart}</span>
      <span className="shrink-0 whitespace-nowrap">&nbsp;..{lastPart}</span>
    </span>
  );
};

export default CardTitle;
