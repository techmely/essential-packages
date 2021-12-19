import React from 'react';

export type IconContextType = {
  color?: string;
  size?: string;
  className?: string;
  style?: React.CSSProperties;
  attr?: React.SVGAttributes<SVGElement>;
};

export const DefaultContext: IconContextType = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined,
};

export const IconContext: React.Context<IconContextType> =
  React.createContext && React.createContext(DefaultContext);
